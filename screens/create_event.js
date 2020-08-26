import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput,Dimensions , SafeAreaView,ScrollView, YellowBox, ImageBackground} from 'react-native';
//import SignUpScreen from './SignUpScreen';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage'
//import RNGooglePlaces from 'react-native-google-places';



//const firebase = require('firebase');
//require("firebase/firestore");
//var db = firebase.firestore();

const today = moment()
const right_now = today.format()

export default class create_event extends React.Component {

    static navigationOptions = {
        headerMode: 'none',
    };

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            displayname: '',
            event_name : '',
            sport: '',
            no_people : '',
            venue : '',
            location:"",
            date: 'Select Date and Time',
            db: firebase.firestore(),
            id: 1,
            isVisible: false,
            keywords: [],
            keywordsSport:[],
            joined: 1,
            //date_time: '',
            day:'',
            see: false,
            check :false,
            visible: false,
            show : false,
            lat : 0,
            long : 0

         

        }
    }
    onFocusFunction = async() =>{
        this.getloc() 
    }
    getloc = async() =>{
        const location = await AsyncStorage.getItem('Location')
        const loc = JSON.parse(location)
        console.log(loc)
        location !== null ? 
            this.setState({
                venue : loc.title,
                lat : loc.long_lat.lat,
                long : loc.long_lat.lng,
            }) :
            this.setState({
                location : ''
            })
    }

    componentDidMount(){
        const today = moment();
        Geocoder.init("AIzaSyCwsGyxbGuuYoCXOvr2Ju4PLZzM9gAo0NY");
        console.log("Geoencoding initialised")
        const user = firebase.auth().currentUser
        this.setState({email : user.email })
        // console.log("success kinda")
        // console.log(user.email)
        //console.log(today.format('MMMM Do YYYY, h:mm A'))
        this.focusListner = this.props.navigation.addListener('didFocus' , () =>{
            this.onFocusFunction()
        })    
      }
      componentWillUnmount() {
        if(this.focusListner.remove()){
            this.focusListener.remove()
       }
    }
      
      

      handlePicker = (datetime) => {
          
          const rn = moment(right_now).format('YYYY-MM-DD')
          const data = moment(datetime).format('YYYY-MM-DD')
          if(moment(rn).isSameOrAfter(data))
                this.setState({
                    see: true
                })
            else {
                this.setState({
                    isVisible: false,
                    date: moment(datetime).format('MMMM Do YYYY, h:mm A'),
                    day: moment(datetime).format('YYYY-MM-DD'),
                    //date_time : moment(datetime).format()
                    
                },() => console.log("Date is ", this.state.date))
            }
             
          
          //console.warn("A date has been picked: ", date);
      }

      hidePicker = (datetime) => {
        this.setState({
            isVisible: false,
            //date: moment(datetime).format(),
            
        },() => console.log("Date issss ", this.state.date))
        
    }

    showPicker = () => {
        console.log('hell')
        this.setState({
            isVisible: true,
        })
        console.log(this.state.isVisible)
    }


    numberOfpeople = (no_people) => {
        if( parseInt(no_people) > 30){
            this.setState({
                show : true,
            })
        } else{
            this.setState({
                show : false,
            })
        }
        this.setState({
            no_people : no_people
        })
    }
      

    handleCreate = async () => {
        
        let arr = this.handleEventName(this.state.event_name)
        console.log(arr)
       

        if (this.check()) {
            console.log("started check")
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.event_name).set({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id,
            keywords: this.state.keywords,
            keywordsSport: this.state.keywordsSport,
            //date_time: this.state.date_time,
            day: this.state.day,
            created_by:this.state.email,
            players:[],
            joined:1,
            lat : this.state.lat,
            long : this.state.long
        
        })
        .then(()=>this.state.db.collection('AllEvents').doc(this.state.event_name).set({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id,
            keywords: this.state.keywords,
            keywordsSport: this.state.keywordsSport,
            joined : 1,
            //date_time: this.state.date_time,
            day: this.state.day,
            created_by:this.state.email,
            players:[],
            location : [],
            lat : this.state.lat,
            long : this.state.long

        }))
        .then(() => console.log("doc added successfully"), this.setState({id: this.state.id+1}) ,this.props.navigation.navigate('MyEvent',{refresh : 'true'}))
        .catch(function(error) {
            console.log("error adding ", error);
        });
    }
    else {
        this.setState({ visible: true })
        console.log('not happeming')
    }
         
    }
    Navigate = () =>{
        console.log("Test")
        this.props.navigation.navigate("Location")
    }
         

    handleEventName = (name) => {
        this.setState ({ event_name: name})
        let arrName = [''];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        })
        this.setState({keywords: arrName})
        return arrName;
    }

    handleSportName = (name) => {
        this.setState ({ sport: name})
        let arrName = [''];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        })
        this.setState({keywordsSport: arrName})
        console.log(arrName)
        return arrName;
    }

    check() {
        console.log('name :' , this.state.event_name , `\n sport : ${this.state.sport} \n people : ${this.state.no_people} \n venue: ${this.state.venue} \n ${this.state.date} ` )
        if (this.state.event_name != '' && this.state.sport != '' && this.state.no_people != '' && this.state.venue != '' &&  this.state.date !== 'Select Date and Time' && parseInt(this.state.no_people) < 31)
          return true
        else
            return false   
    }

    render() {
        console.disableYellowBox = true
        return(
            <View style = {styles.container}>
                <ImageBackground
                    source = {require('../assets/infobkg2.jpeg')}
            style = {{flex: 1}}
            
        >
            <ScrollView style = {styles.container}>
               
                <View style = {{marginHorizontal: 20,
        marginBottom: 30, paddingTop:20}}>
                    <Text style = {styles.inputTitle}>Event name</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="words" 
                    onChangeText = {event_name => this.handleEventName(event_name)}
                    value = {this.state.event_name}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Sport</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="words" 
                    onChangeText = {sport => this.handleSportName(sport)}
                    value = {this.state.sport}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Number of players in team</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    keyboardType = "number-pad"
                    onChangeText = {no_people => this.numberOfpeople(no_people)}
                    value = {this.state.no_people}
                    >
                    </TextInput>
                </View>
                {
                   this.state.show ? <Text style = {{ color : 'red' , marginLeft:20 , fontSize:20}}>Maximum 30 players allowed</Text> : null
                }
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Venue</Text>
                    <TouchableOpacity onPress={this.Navigate} >
            <Text style = {styles.input}>{this.state.venue ? this.state.venue : 'Add your location'}</Text>
                    </TouchableOpacity>
                </View>
                <Dialog
                    visible={this.state.see}
                   // dialogTitle = {<DialogTitle title="CAUTION"/>}
                    footer={
                        <DialogFooter>
                           <DialogButton
                            text="OK"
                            onPress={() => this.setState({see: false,isVisible: false})}
                          />
        
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>INVALID DATE</Text>
                    </DialogContent>
                </Dialog>
                <Dialog
                            visible={this.state.visible}
                            dialogTitle={<DialogTitle title="CAUTION" />}
                            footer={
                                <DialogFooter>

                                    <DialogButton
                                        text="OK"
                                        onPress={() => this.setState({ visible: false })}
                                    />
                                </DialogFooter>
                            }
                            dialogAnimation={new SlideAnimation({
                                slideFrom: 'bottom',
                            })}
                        >
                            <DialogContent>
                                <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Please fill up all the fields!</Text>
                            </DialogContent>
                        </Dialog>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Date</Text>
                    <TouchableOpacity onPress={this.showPicker} >
                    <Text style = {styles.input}>{this.state.date}</Text>
                    </TouchableOpacity>
                    
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        mode='datetime'
                        display = {'spinner'}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                    />
                    
                    
    
                </View>
                
                
                <TouchableOpacity style = {styles.button } onPress = {this.handleCreate}>
                    <Text style = {{color: "white", fontFamily:'Roboto-Regular', fontSize: 20, fontWeight: 'bold'}}>CREATE</Text>

                </TouchableOpacity>
                <View style = {{ height: 40, width:40,marginRight: 10,marginBottom: 0, marginTop:80 ,alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress = {() => alert('Name of the event and number of players cannot be changed later')}>
                    <Icon style={{alignSelf: 'flex-end',}}
                        name = "exclamation-circle"
                        size = {25}
                        color = "#f44336"
                    />
                </TouchableOpacity>
                </View>
                
                
            </ScrollView>
            </ImageBackground>
      
            </View>
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       //paddingTop: 15,
       //backgroundColor: 'black'
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 40,
        //marginTop: 20,
        fontWeight: 'bold'
    },
    inputForm: {
        marginHorizontal: 20,
        marginBottom: 30

    },

    inputTitle: {
        fontSize:18,
        color: "#ababab",
        fontFamily: 'Roboto-Light'
    },
    input: {
        fontSize: 18,
        borderBottomWidth: StyleSheet.hairlineWidth,
        //height: 40,
        color:'#fff',
        borderColor: '#424242',
        fontFamily: 'Roboto-Light'
    
    },
    button: {
       // marginHorizontal: 30,
        backgroundColor: "#00e676",
        borderRadius: 25,
        height: 5.5/100*Dimensions.get('window').height,
        justifyContent:"center",
        alignItems:"center",
        width: 45/100*Dimensions.get('window').width,
        alignSelf:'center',
        marginTop: 15
        
    
    }


});