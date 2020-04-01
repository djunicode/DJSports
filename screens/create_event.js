import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput , SafeAreaView,ScrollView, YellowBox} from 'react-native';
//import SignUpScreen from './SignUpScreen';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
//import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
//import RNGooglePlaces from 'react-native-google-places';



//const firebase = require('firebase');
//require("firebase/firestore");
//var db = firebase.firestore();



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
            date: 'Select Date and Time',
            db: firebase.firestore(),
            id: 1,
            isVisible: false,
            keywords: [],
            joined: 1
            
            

            

        }
    }


    componentDidMount(){
        const user = firebase.auth().currentUser
        this.setState({email : user.email })
        console.log("success kinda")
        console.log(user.email)
        
      }

    

      handlePicker = (datetime) => {
          this.setState({
              isVisible: false,
              date: moment(datetime).format('MMMM Do YYYY, h:mm A'),
              
          },() => console.log("Date is ", this.state.date))
          
          //console.warn("A date has been picked: ", date);
      }

      hidePicker = (datetime) => {
        this.setState({
            isVisible: false,
            //date: moment(datetime).format(),
            
        },() => console.log("Date is ", this.state.date))
        
    }

    showPicker = () => {
        this.setState({
            isVisible: true,
        })
    }



      

    handleCreate = () => {
        let arr = this.handleEventName(this.state.event_name)
        console.log(arr)
        
        //alert('Event created')
        console.log(this.state.event_name)
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.event_name).set({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id,
            keywords: this.state.keywords,
        
        })
        .then(()=>this.state.db.collection('AllEvents').doc(this.state.event_name).set({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id,
            keywords: this.state.keywords,
            joined : 1
        }))
        .then(() => console.log("doc added successfully"), this.setState({id: this.state.id+1}) ,this.props.navigation.navigate('MyEvent',{refresh : 'true'}))
        .catch(function(error) {
            console.log("error adding ", error);
        });
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

    

    render() {
        console.disableYellowBox = true
        return(
            <View style = {styles.container}>
                <View style = {{ height: 55, width: 80, marginBottom:0,alignSelf:'flex-start'}}>
                 <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                        <Icon style = {{margin: 20, marginBottom: 0}}
                            name = "arrow-left"
                            size = {35}
                            color = "black"
                        />
                    </TouchableOpacity>
                </View>
            <Text style = {styles.header}>{'Create your event'}</Text>
            <ScrollView style = {styles.container}>
               
                <View style = {styles.inputForm}>
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
                    onChangeText = {sport => this.setState({sport})}
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
                    onChangeText = {no_people => this.setState({no_people})}
                    value = {this.state.no_people}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Venue</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize= "sentences" 
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText = {venue => this.setState({venue})}
                    value = {this.state.venue}
                    >
                    </TextInput>
                </View>
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
                    <Text style = {{color: "white"}}>CREATE</Text>

                </TouchableOpacity>
                <View style = {{ height: 40, width:40,marginRight: 20,marginBottom: 20, marginTop:40 ,alignSelf: 'flex-end'}}>
                <TouchableOpacity onPress = {() => alert('Name of the event and number of players cannot be changed later')}>
                    <Icon style={{alignSelf: 'flex-end',}}
                        name = "exclamation-circle"
                        size = {25}
                        color = "red"
                    />
                </TouchableOpacity>
                </View>
                
                
            </ScrollView>
            
      
            </View>
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
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
        color: "#8A8F9E"
    },
    input: {
        fontSize: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40
    
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 8,
        height: 52,
        justifyContent:"center",
        alignItems:"center",
    
    }


});