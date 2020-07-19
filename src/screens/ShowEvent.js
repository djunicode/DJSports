import React from 'react'
import { Linking, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput, ImageBackground } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
//import {Icon} from 'native-base',
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ShowEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            displayname: '',
            event_name: '',
            sport: '',
            no_people: '',
            created_by: '',
            venue: '',
            date: '',
            db: firebase.firestore(),
            id: 1,
            documentData: [],
            players: [],
            data2: [],
            lat: 0,
            long: 0,
            location: ""


        }
    }

    componentDidMount() {
        const { state } = this.props.navigation;
        const user = firebase.auth().currentUser
        this.retData(state.params.event_name)
        var location
        console.log(state.params.venue)
        /*try {
            fetch('https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=4&searchtext=' + state.params.venue + '&apiKey=l9zrSly8XJoP7gQ7M5hCxRe_-g6f-yfr41tgSF2N7Yc')
            .then((response) => response.json())
            .then((json) => {
                console.log("test")
                location = json.Response.View[0].Result[0].Location.DisplayPosition
                this.setState({
                    lat: json.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                    long: json.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                })
                console.log(this.state.lat)
                console.log(this.state.long)


            })
            .catch((error) => {
                console.error(error);
            })
        }
        catch(error){
            console.log('locating error: ', error)
        }*/
        
        this.setState({
            event_name: state.params.event_name,
            no_people: state.params.no_people,
            sport: state.params.sport,
            date: state.params.date,
            venue: state.params.venue,
            created_by: state.params.created_by,
            email: user.email,
            lat : state.params.lat,
            long : state.params.long

        })
    }
    retData = async (item) => {
        console.log(item)
        var docRef = this.state.db.collection("AllEvents").doc(item);

        await docRef.get().then((doc) => {
            this.setState({
                data2: doc.data()
            })
            // console.log(this.state.data2)
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    render() {
        console.disableYellowBox = true
        return (
            (this.state.email == this.state.created_by)
                ?
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../images/infobkg2.jpeg')}
                        style={{ flex: 1, }}

                    >


                        <Text style={styles.headerText}>{this.state.event_name}</Text>


                        <View style={styles.shadow}>
                            <Icon name="soccer-ball-o" size={25} style={styles.icon} />
                            <Text style={styles.info}>{this.state.sport}</Text>
                        </View>

                        <View style={styles.shadow} >

                            <Icon name="users" style={styles.icon} size={25} />
                            <Text style={styles.info}>{this.state.no_people}</Text>
                            <TouchableOpacity onPress={() => {
                                //console.log(this.state.data2)
                                this.props.navigation.navigate('ShowList', { players: this.state.data2.players })
                            }}>
                                <Icon name="eye" style={{ color: '#ababab', paddingLeft: 260, padding: 12 }} size={19} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.shadow}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Icon name="map-marker" style={styles.icon} size={25} />
                                <Text style={styles.info}>{this.state.venue}</Text>
                                
                            </View>
                        </View>
    
                        <TouchableOpacity disabled={false} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${this.state.lat},${this.state.long}`)}>
                                    <View style={{ flexDirection: 'row', marginLeft: 40 , paddingBottom: 20}}>
                                        <Icon name="location-arrow" style={{ color: '#ababab',}} size={15} />
                                        <Text style={{ color: '#ababab',}}>
                                            {"  Directions"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                        <View style={styles.shadow}>
                            <Icon name="calendar" style={styles.icon} size={25} />
                            <Text style={styles.info}>{this.state.date}</Text>
                        </View>


                    </ImageBackground>
                </View>
                :
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../images/infobkg2.jpeg')}
                        style={{ flex: 1 }}

                    >


                        <Text style={styles.headerText}>{this.state.event_name}</Text>


                        <View style={styles.shadow}>
                            <Icon name="soccer-ball-o" size={25} style={styles.icon} />
                            <Text style={styles.info}>{this.state.sport}</Text>
                        </View>

                        <View style={styles.shadow} >

                            <Icon name="users" style={styles.icon} size={25} />
                            <Text style={styles.info}>{this.state.no_people}</Text>
                            <TouchableOpacity onPress={() => {
                                //console.log(this.state.data2)
                                this.props.navigation.navigate('ShowList', { players: this.state.data2.players })
                            }}>
                                <Icon name="eye" style={{ color: '#ababab', paddingLeft: 260, padding: 12 }} size={19} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.shadow}>
                            <Icon name="map-marker" style={styles.icon} size={25} />
                            <Text style={styles.info}>{this.state.venue}</Text>
                            <Text> {this.state.location}</Text>
                        </View>
                        <TouchableOpacity disabled={true} onPress={() => Linking.openURL('http://www.google.com/maps/place/' + this.state.lat + ',' + this.state.long)}>
                                    <View style={{ flexDirection: 'row', marginLeft: 40 , paddingBottom: 20}}>
                                        <Icon name="location-arrow" style={{ color: '#ababab',}} size={15} />
                                        <Text style={{ color: '#ababab',}}>
                                            {"  Directions"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                        <View style={styles.shadow}>
                            <Icon name="calendar" style={styles.icon} size={25} />
                            <Text style={styles.info}>{this.state.date}</Text>
                        </View>


                    </ImageBackground>
                </View>



        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#'
        //alignItems: 'center',
        //justifyContent: 'space-around',

    },
    headerText: {
        alignSelf: 'center',
        fontSize: 45,
        //fontStyle: 'italic',
        padding: 15,
        //fontWeight: 'bold',
        color: '#fafafa',
        elevation: 20,
        fontFamily: 'FiraSansCondensed-Regular'

    },
    header: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 12,
        justifyContent: 'center',
        //paddingTop: 15
        //borderBottomWidth: 1,
        //borderBottomColor: "black",


    },
    title: {
        fontSize: 30,
        //marginLeft: 10,
        fontWeight: 'bold',
        padding: 5,
        color: '#ababab'

    },
    info: {
        fontSize: 25,
        //marginLeft: 10,
        padding: 10,
        paddingBottom: 1,
        color: '#e0e0e0',
        fontFamily: 'Roboto-Light'



    },
    shadow: {
        // borderColor:'black', // if you need 
        // borderWidth:2.5,
        //elevation: 20,
        //shadowColor: 'red',
        borderRadius: 8,
        //alignItems: 'center',
        //alignSelf: 'stretch',
        //justifyContent: 'center',
        //borderBottomColor: '#3f51b5',
        //borderTopColor: '#3f51b5',
        //backgroundColor: '#84ffff',
        marginHorizontal: 10,
        //borderRightColor:'#3f51b5',
        marginVertical: 10,
        flexDirection: 'row',
        //padding:10


    },
    icon: { 
        color: 'white',
        padding: 12
    }
})