import React, { Component, useRef, useImperativeHandle } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    StatusBarStyle
} from "react-native";
import * as firebase from 'firebase/app'
import 'firebase/firestore'


import { Container, Header, Body, CheckBox, Title, Card, CardItem, Left, Right, Content, Thumbnail, Grid, Button, Subtitle } from 'native-base'
import TeamCard from '../components/TeamCard.js'
//import { Item } from "react-native-paper/lib/typescript/src/components/List/List";
// teamDetails
// teamName
// image
// moreDetails

class Notification extends Component {
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
            item: [],
            data2: [],
            expanded: false,
            documentSnapshots: [],
            data: [],
            isempty: false,
            image : []

        }
    }
    componentDidMount() {

        //const today = moment();
        const user = firebase.auth().currentUser
        this.setState({ email: user.email })
        console.log("on notif")
        console.log(user)
        //this.firebasegetdata(user.email)
        this.retrieveData(user.email)
        // this.focusListener = this.props.navigation.addListener('didFocus', () => {
        //      this.onFocusFunction(user.email)
        // })



    }
    onFocusFunction = (email) => {
        this.retrieveData(email)
        console.log("i am focused")
        //console.log(today.format('MMMM Do YYYY, h:mm A'))

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
            let initialQuery = await firebase.firestore().collection('Invites').doc(email).collection('InviteFrom')
                .limit(this.state.limit)
            // Cloud Firestore: Query Snapshot
            let documentSnapshots = await initialQuery.get();
            // Cloud Firestore: Document Data
            let documentData = documentSnapshots.docs.map(document => document.data());
            // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
            let lastVisible = documentData[documentData.length - 1].id;
            // Set State
            let docSnap = await firebase.firestore().collection('Users').doc(email).get()
            let data = docSnap.data()
            this.setState({
                data: data,
                documentSnapshots: documentSnapshots,
                docSnap: docSnap,
                documentData: documentData,
                lastVisible: lastVisible,
                loading: false,
            });
            this.state.documentData.forEach(element => {
                let data = element.EventName
                element.EventName.forEach(item=>{
                    const index = data.indexOf(item)
                    this.state.db.collection('AllEvents').doc(item).get()
                    .then((docSnapshot)=>{
                        if(!docSnapshot.exists){
                        if (index != -1) data.splice(index, 1);
                        console.log(data.length)
                        this.state.db.collection('Invites').doc(this.state.email).collection('InviteFrom').doc(element.id).update({
                            EventName: data
                        })
                        console.log(data.length)
                        if (data.length == 0) {
                            this.state.db.collection('Invites').doc(user.email).collection('InviteFrom').doc(element.id).delete()
                            
                        }
                        // 
                        }
                    })
                    // console.log(data)
                   

                })

            });
        }
        catch (error) {
            console.log(error);
            this.setState({ loading: false, direct: true })

        }
        this.Image()

    };
    accept = async (item) => {
        let EventData = []
        const user = firebase.auth().currentUser
        var docRef = this.state.db.collection("AllEvents").doc(item);

        await docRef.get().then(function (doc) {
            EventData = doc.data()
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        let player = EventData.players
        let creator = EventData.created_by
        console.log(player)
        player.push(this.state.email)
        // console.log(params.item.joined+1)
        let count = EventData.joined + 1


        this.state.db.collection('AllEvents').doc(item).update({
            joined: count,
            players: player

        })
        this.state.db.collection('CreatedEvent').doc(creator).collection('MyEvent').doc(item).update({
            players: player
        })
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(item).set({
            event_name: item,
            sport: EventData.sport,
            no_people: EventData.no_people,
            venue: EventData.venue,
            date: EventData.date,
            id: EventData.id,
            keywords: EventData.keywords,
            created_by: EventData.created_by
        })
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(item).update({
            joined: count,
        })
        this.state.documentData.forEach(element => {
            let index = element.EventName.indexOf(item)
            if (index != -1) element.EventName.splice(index, 1);
            console.log(element.EventName)
            this.state.db.collection('Invites').doc(this.state.email).collection('InviteFrom').doc(element.id).update({
                EventName: element.EventName
            }).then(this.onFocusFunction(user.email))
            if (element.EventName.length == 0) {
                this.state.db.collection('Invites').doc(this.state.email).collection('InviteFrom').doc(element.id).delete().then(this.onFocusFunction(user.email))
            }
            console.log(element.EventName)
        });


    }
    ignore = (item) => {
        const user = firebase.auth().currentUser
        // console.log(this.state.documentData)
        try {
            this.state.documentData.forEach(element => {
                let index = element.EventName.indexOf(item)
                if (index != -1) element.EventName.splice(index, 1);
                 console.log(element.id)
                this.state.db.collection('Invites').doc(user.email).collection('InviteFrom').doc(element.id).update({
                    EventName: element.EventName
                }).then(this.onFocusFunction(user.email))
                if (element.EventName.length == 0) {
                    this.state.db.collection('Invites').doc(user.email).collection('InviteFrom').doc(element.id).delete()
                    
                }
                this.onFocusFunction(user.email)
                // console.log(element.EventName)
            });
        }
        catch (error) {
            console.log('ignore error is ', error)
        }



    }
    static navigationOptions = {
        title: 'First Screen'
    }
    Image =  ( ) => {
        console.log(this.state.documentData)
        this.state.documentData.map((data) => {
            console.log(data)
            const imageRef =  firebase.firestore().collection('Users').doc(data.id);
            imageRef.onSnapshot((data) => {
              this.state.image.push(data.data().image)
                this.setState({image : this.state.image})
                
            }    
                
              );
        })
    }
    render() {
        var { navigate } = this.props.navigation;
        var body = [];

        return (
            
            <View style={{ flex: 1, backgroundColor: '#000', borderTopColor: '#00e676', borderTopWidth: 1 }}>
                <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />
                
                <FlatList
                    scrollEnabled={true}
                    data={this.state.documentData}
                    renderItem={({ item ,index }) =>
                        
                        <View style={{
                            flexDirection: 'row', margin: 20, marginTop: 10, borderBottomWidth: StyleSheet.hairlineWidth,
                            borderColor: '#424242'
                        }}>
                            <View styles={{ flexDirection: 'row', }}>
                                <Image 
                                    source = {{uri : this.state.image[index]}}
                                    style = {{height:100 , width:100 , alignSelf:'center' , borderRadius:50}}
                                />
                                
                                <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#ababab', fontFamily: 'SpaceMono-Regular' }}>
                                    {item.id}{"\n"}
                                </Text>
                            </View>
                            <FlatList
                                data={item.EventName}
                                renderItem={({ item }) =>
                                    <View>

                                        <View style={{ margin: 15, marginTop: 0 }}>

                                            <Text style={{ fontSize: 16, color: '#f0f0f0', fontFamily: 'Roboto-Light', marginLeft: 8 }}>
                                                Invited you for
                                            </Text>
                                            <Text style={{ fontSize: 15, color: '#fff', fontFamily: 'Roboto-Black', marginLeft: 8, paddingBottom: 5 }}>
                                                {item}
                                            </Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity style={{ margin: 10, backgroundColor: '#00e676', padding: 8, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} onPress={() => this.accept(item)}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: "#fff" }}>
                                                        Accept
                            </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ margin: 10, backgroundColor: '#D3D3D3', padding: 8, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => this.ignore(item)}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                                                        Ignore
                            </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                }
                            />
                        </View>
                       
                    }
                    
                />
            </View>

        );
    }
}
export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button2: {
        //marginHorizontal: 30,
        backgroundColor: 'white',
        borderRadius: 9,
        // height: 32,
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        alignSelf: 'center',
        marginBottom: 10,
        elevation: 20,


    },
});

/*<TouchableOpacity style = {{alignSelf : 'center'}}
                onPress  = {
                    ()=>navigate('create_team')}>
                   <Card style = {{width : 300,height : 50}}>
                       <CardItem style = {{alignContent : 'center'}}>

                           <Title style = {{color : 'black'}}>Create Team</Title>
                        </CardItem>
                   </Card>
                </TouchableOpacity>
                <TouchableOpacity style = {{alignSelf : 'center'}}
                onPress  = {
                    ()=>navigate('join_team')}
                >
                   <Card style = {{width : 300,height : 50}}>
                       <CardItem style = {{alignContent : 'center'}}>

                           <Title style = {{color : 'black'}}>Join Team</Title>
                        </CardItem>
                   </Card>
                </TouchableOpacity>*/