import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, StatusBar, StatusBarStyle,YellowBox , LayoutAnimation} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import moment from 'moment';
import ActionButton from 'react-native-action-button';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuProvider, renderers } from 'react-native-popup-menu';

const { SlideInMenu } = renderers;
const today = moment()
const right_now = today.format()

export default class MyEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            displayname: '',
            event_name: '',
            sport: '',
            no_people: '',
            venue: '',
            date: '',
            location: [],
            db: firebase.firestore(),
            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,
            item: [],
            data2: [],
            expanded: false

        }



    }
    onFocusFunction = (email) => {
        this.retrieveData(email)
        console.log("i am focused")
        //console.log(today.format('MMMM Do YYYY, h:mm A'))

    }



    componentDidMount() {

        //const today = moment();
        const user = firebase.auth().currentUser
        this.setState({ email: user.email })
        console.log("success kinda")

        console.log(user)
        
        //this.firebasegetdata(user.email)
        this.retrieveData(user.email)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction(user.email)
        })



    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    filter = (data) => {
       //let data = []
       //let data = this.state.documentData
       for(let i=0; i<data.length; i++){
           console.log(i)
           this.checkDate(data[i].day, data[i].event_name)
            //console.log(i," ", data[i].event_name)
       }
    }




    retrieveData = async (email) => {
        try {
            // Set State: Loading
            this.setState({
                loading: true,
                direct: false
            });
            console.log('Retrieving Data for ', email);
            // Cloud Firestore: Query
            let initialQuery = await firebase.firestore().collection('CreatedEvent').doc(email).collection('MyEvent')
                .limit(this.state.limit)
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            this.setState({
                documentData: documentData,
                lastVisible: lastVisible,
                loading: false,
            });
            this.filter(documentData)
            
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false, direct: true })

        }
    };
    // Retrieve More
    retrieveMore = async () => {
        try {
            // Set State: Refreshing
            this.setState({
                refreshing: true,
            });
            console.log('Retrieving additional Data');
            // Cloud Firestore: Query (Additional Query)
            let additionalQuery = await firebase.firestore().collection('CreatedEvent').doc(this.state.email).collection('MyEvent')
                .startAfter(this.state.lastVisible)
                .limit(this.state.limit)
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await additionalQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            this.setState({
                documentData: [...this.state.documentData, ...documentData],
                lastVisible: lastVisible,
                refreshing: false,
            });
            this.filter([...this.state.documentData, ...documentData])
        }
    
        catch (error) {
            console.log(error);
        }
    };

    renderFooter = () => {
        try {
            // Check If Loading
            if (this.state.loading) {
                return (
                    <ActivityIndicator />
                )
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    showEvent = (item) => {
        console.log(item.event_name)
        this.props.navigation.navigate('ShowEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date, players: item.players, created_by: item.created_by })

    }

    goEdit = (item) => {
        console.log(item.event_name)
        this.props.navigation.navigate('EditEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date, day: item.day })

    }


    deleteEvent = () => {
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.item.event_name).delete().then(function () {

            console.log("Document successfully deleted from CreatedEvent!");
            //alert('Event deleted')

        }).then(this.onFocusFunction(this.state.email),
            this.state.db.collection('AllEvents').doc(this.state.item.event_name).delete().then(function () {

                console.log("Document successfully deleted from AllEvents!");


            })
        )
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
        this.state.item.players.forEach(element => {
            this.state.db.collection('CreatedEvent').doc(element).collection('MyEvent').doc(this.state.item.event_name).delete()

        });
    }

    deletEvent = (event) => {
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(event).delete().then(function () {

            console.log("Document successfully deleted from CreatedEvent!");
            //alert('Event deleted')

        }).then(this.onFocusFunction(this.state.email),
            this.state.db.collection('AllEvents').doc(event).delete().then(function () {

                console.log("Document successfully deleted from AllEvents!");


            }),
            this.retrieveData(this.state.email)
        )



            .catch(function (error) {
                console.error("Error removing document: ", error);
            });

    }
    leaveEvent = async (item) => {
        // this.retrieveData2()
        var docRef = this.state.db.collection("AllEvents").doc(item.event_name);

        await docRef.get().then((doc) => {
            this.setState({
                data2: doc.data()
            })
            //console.log(this.state.data2)
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        console.log(this.state.data2)
        let arr = this.state.data2
        arr = arr.players
        arr = arr.filter(item => item != this.state.email)
        console.log(arr)
        let count = item.joined
        count = count - 1
        this.state.db.collection('AllEvents').doc(item.event_name).update({
            joined: count,
            players: arr

        })
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(item.event_name).delete().then(function () {

            console.log("Document successfully deleted from CreatedEvent!");
            alert('Event left')

        }).then(this.onFocusFunction(this.state.email))
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });


    }
    //{(today.isSameOrAfter(item.moment)?this.deleteEvent():console.log('ello'))}

    checkDate = (data, event) => {
        const rn = moment(right_now).format('YYYY-MM-DD')
        console.log("right now is ",moment(right_now).format('YYYY-MM-DD')),
            console.log("date to be checked is ",data)
        console.log(moment(rn).isAfter(data))
        if (moment(rn).isAfter(data))
            this.deletEvent(event)

    }

    render() {
        <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
        console.disableYellowBox = true
        var { navigate } = this.props.navigation;
        //console.log(today.format('MMMM Do YYYY, h:mm A'))


        return (
            <MenuProvider>
                <SafeAreaView style={styles.container}>
                <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />
                    {(!this.state.direct) ? <FlatList
                        // Data
                        data={this.state.documentData}
                        // Render Items
                        renderItem={({ item }) => (
                           
                            (item.created_by == this.state.email)
                                ?
                                 
                                <View style={styles.itemContainer}>


                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.event_name}>{item.event_name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 30 }}>
                                            <Menu
                                                onSelect={() => console.log('blahh ', item.event_name)}
                                                renderer={SlideInMenu} style={{ width: 50, height: 20, justifyContent: 'center' }}>
                                                <MenuTrigger style={{ color: 'white' }}
                                                >
                                                    <Icon style={{ alignSelf: 'center', flexDirection: 'column', padding: 0 }}
                                                        name="ellipsis-v"
                                                        size={24}
                                                        color="#636363"
                                                    />
                                                </MenuTrigger>
                                                <MenuOptions style={{ backgroundColor: 'white'}}>                                                    
                                                    <MenuOption onSelect={() => this.goEdit(item)} style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                
                                                        <Text style={styles.menuText}>
                                                        <Icon name="pencil" size = {17}/>
                                                            {'  Edit the Event'}
                                                        </Text>
                                                     
                                                    </MenuOption>
                                                    <MenuOption onSelect={() => this.showEvent(item)}  style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="info-circle" size = {17}/>
                                                            {'  View details'}
                                                        </Text>
                                                    </MenuOption>
                                                    <MenuOption onSelect={() =>  this.setState({ item: item, visible: true })} style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="trash-o" size = {17}/>
                                                            {'  Delete the event'}
                                                        </Text>
                                                    </MenuOption>
                                                    <MenuOption onSelect={() => {navigate('ProfileSearch',{ event_name: item.event_name }) }} style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="envelope" size = {17}/>
                                                            {'  Invite'}
                                                        </Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                    </View>
                                    <View style = {{flex:1,flexDirection: 'row', marginLeft:10, paddingTop:10}}>
                                    <Icon style={{padding:6, paddingRight:0}} name="calendar" size = {17} color="#ababab"/>
                                    <Text style={styles.date}>{item.date}</Text>
                                    </View>
                                </View>


                                :
                                <View style={styles.itemContainer}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.event_name}>{item.event_name}</Text>
                                        </View>
                                        <View style={{  flexDirection: 'column', justifyContent: 'center', marginRight: 30 }}>
                                        <Menu
                                                onSelect={() => console.log('blahh ', item.event_name)}
                                                renderer={SlideInMenu} style={{ width: 50, height: 20, justifyContent: 'center' }}>
                                                <MenuTrigger style={{ color: 'white' }}
                                                >
                                                    <Icon style={{ alignSelf: 'center', flexDirection: 'column', padding: 0 }}
                                                        name="ellipsis-v"
                                                        size={24}
                                                        color="#636363"
                                                    />
                                                </MenuTrigger>
                                                <MenuOptions style={{ backgroundColor: 'white',borderBottomWidth: 0.2, borderBottomColor:'#212121'}}>                                                    
                                                   
                                                    <MenuOption onSelect={() => this.showEvent(item)}  style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="info-circle" size = {17}/>
                                                            {'  View details'}
                                                        </Text>
                                                    </MenuOption>
                                                    <MenuOption onSelect={() =>  this.leaveEvent(item)} style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="window-close" size = {17}/>
                                                            {'  Leave the event'}
                                                        </Text>
                                                    </MenuOption>
                                                    <MenuOption onSelect={() => {navigate('ProfileSearch',{ event_name: item.event_name }) }} style = {{borderBottomWidth: 0.2, borderBottomColor:'#ababab', marginLeft: 10, marginRight: 10}}>
                                                    <Text style={styles.menuText}>
                                                        <Icon name="envelope" size = {17}/>
                                                            {'  Invite'}
                                                        </Text>
                                                    </MenuOption>
                                                </MenuOptions>
                                            </Menu>
                                        </View>
                                    </View>
                                    <View style = {{flex:1,flexDirection: 'row', marginLeft:10, paddingTop:10}}>
                                    <Icon style={{padding:6, paddingRight:0}} name="calendar" size = {17} color="#ababab"/>
                                    <Text style={styles.date}>{item.date}</Text>
                                    </View>
                                </View>
                        )}
                        // Item Key
                        keyExtractor={(item, index) => String(index)}
                        // Header (Title)
                        ListHeaderComponent={this.renderHeader}
                        // Footer (Activity Indicator)
                        ListFooterComponent={this.renderFooter}
                        // On End Reached (Takes a function)
                        onEndReached={this.retrieveMore}
                        // How Close To The End Of List Until Next Data Request Is Made
                        onEndReachedThreshold={0}
                        // Refreshing (Set To True When End Reached)
                        refreshing={this.state.refreshing}
                    /> : <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 25, color:'white' }}>NO EVENTS</Text>
                            <Text style={{ fontSize: 17 , color: 'white'}}>PROCEED BY TAPPING THE BUTTON BELOW</Text>
                        </View>}

                    <Dialog
                        visible={this.state.visible}
                        // dialogTitle = {<DialogTitle title="CAUTION"/>}
                        footer={
                            <DialogFooter>
                                <DialogButton 
                                    text="Cancel"
                                    
                                    onPress={() => this.setState({ visible: false })}
                                />
                                <DialogButton
                                    text="OK"
                                    onPress={() => this.setState({ visible: false }, this.deleteEvent())}
                                />
                            </DialogFooter>
                        }
                        dialogAnimation={new SlideAnimation({
                            slideFrom: 'bottom',
                        })}
                    >
                        <DialogContent>
                            <Text style={{ padding: 20, paddingBottom: 0, fontSize: 20 }}>Delete event {this.state.item.event_name}?</Text>
                        </DialogContent>
                    </Dialog>
                    <ActionButton
                        buttonColor="#00e676"
                        buttonTextStyle={{ color: 'black' }}
                        onPress={() => { this.props.navigation.navigate('create_event') }}
                        //renderIcon={() => this.icon()}
                        degrees='180'

                    />

                </SafeAreaView>
            </MenuProvider>
        );
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'


    },
    header: {
        alignSelf: "center",
        fontStyle: "italic",
        fontSize: 40,
        marginBottom: 20,
        marginTop: 20
    },
    headerText: {
        fontFamily: 'System',
        fontSize: 36,
        fontWeight: '600',
        color: '#000',
        marginLeft: 12,
        marginBottom: 12,
    },
    itemContainer: {
        height: 120,
        //flexDirection: 'row',
        borderWidth: 0.2,
        borderBottomColor: '#424242',
       // borderTopColor: '#ababab'
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    text: {
        fontFamily: 'System',
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
    },
    event_name: {
        fontSize: 28,
        alignSelf: 'flex-start',
        marginLeft: 15,
        paddingTop: 20,
        color: 'white',
        fontFamily: 'FiraSansCondensed-Regular'

    },
    date: {
        fontSize: 18,
        //fontStyle: 'italic',
        alignSelf: 'stretch',
        marginLeft: 15,
        paddingBottom: 20,
        color: '#ababab',
        fontFamily: 'FiraSansCondensed-Regular'
    },
    button: {
        height: 80,
        width: 80,
        margin: 20,
        alignSelf: 'flex-end'
    },
    menuText: {
        color: '#424242',
        fontSize: 20,
        fontFamily: "FiraSansCondensed-Regular",

    }

});





/*<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <TouchableOpacity onPress={() => this.showEvent(item)}>
                                                    <Icon style={{ marginLeft: 12, alignSelf: 'center', flexDirection: 'column' }}
                                                        name="info-circle"
                                                        size={25}
                                                        color="#00e676"
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.leaveEvent(item)}>
                                                    <Icon style={{ marginLeft: 12, marginRight: 15, alignSelf: 'center', flexDirection: 'column' }}
                                                        name="window-close"
                                                        size={25}
                                                        color="#00e676"
                                                    />
                                                </TouchableOpacity>
                                            </View>
                            */