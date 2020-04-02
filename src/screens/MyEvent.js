import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, YellowBox } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationEvents } from 'react-navigation';
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';




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
            db: firebase.firestore(),

            documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,
            item: []

        }



    }
    onFocusFunction = (email) => {
        this.retrieveData(email)
        console.log("i am focused")

    }



    componentDidMount() {


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
        this.props.navigation.navigate('ShowEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date })

    }

    goEdit = (item) => {
        console.log(item.event_name)
        this.props.navigation.navigate('EditEvent', { event_name: item.event_name, sport: item.sport, no_people: item.no_people, venue: item.venue, date: item.date })

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
            
    }

    render() {
        <NavigationEvents onDidFocus={() => console.log('I am triggered')} />
        console.disableYellowBox = true

        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>MY EVENTS</Text>


                {(!this.state.direct) ? <FlatList
                    // Data
                    data={this.state.documentData}
                    // Render Items
                    renderItem={({ item }) => (

                        <View style={styles.itemContainer}>

                            <Text style={styles.event_name}>{item.event_name}</Text>


                            <Text style={styles.date}>Date: {item.date}</Text>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.showEvent(item)}>
                                    <Icon style={{ margin: 12, alignSelf: 'center', flexDirection: 'column' }}
                                        name="info-circle"
                                        size={25}
                                        color="#3f51b5"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.goEdit(item)}>
                                    <Icon style={{ margin: 12, alignSelf: 'flex-end', flexDirection: 'column' }}
                                        name="pencil"
                                        size={25}
                                        color="#3f51b5"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({item: item, visible:true})}>
                                    <Icon style={{ margin: 12, alignSelf: 'center', flexDirection: 'column' }}
                                        name="trash-o"
                                        size={25}
                                        color="#3f51b5"
                                    />
                                </TouchableOpacity>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 25 }}>NO EVENTS</Text>
                        <Text style={{ fontSize: 17 }}>PROCEED BY TAPPING THE BUTTON BELOW</Text>
                    </View>}

                    <Dialog
                    visible={this.state.visible}
                   // dialogTitle = {<DialogTitle title="CAUTION"/>}
                    footer={
                        <DialogFooter>
                           <DialogButton
                            text="Cancel"
                            onPress={() => this.setState({visible: false})}
                          />
                          <DialogButton
                            text="OK"
                            onPress={() => this.setState({visible: false},this.deleteEvent())}
                          />
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>Delete event {this.state.item.event_name}?</Text>
                    </DialogContent>
                </Dialog>
                

                <TouchableOpacity onPress={() => this.props.navigation.navigate('create_event')}>
                    <Icon style={{ marginRight: 20, marginBottom: 20, alignSelf: 'flex-end',  }}
                        name="plus-circle"
                        size={60}
                        color="#3f51b5"
                    />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

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
        borderWidth: .2,
        borderColor: '#000',
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
        fontSize: 25,
        alignSelf: 'flex-start',
        margin: 10,

    },
    date: {
        fontSize: 18,
        fontStyle: 'italic',
        alignSelf: 'stretch',
        marginLeft: 10
    }

});
