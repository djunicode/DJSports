import React from 'react';
import { Text, StyleSheet, ImageBackground} from 'react-native';
import firebase from 'firebase'
import OneSignal from 'react-native-onesignal'

export default class SplashScreen extends React.Component{
    constructor(props){
        super(props)
        OneSignal.init("ca9649a8-0f47-4d27-9c5f-e2d33c5bda97")
    }
    componentDidMount = async() =>{
        console.log("starting")
        this.FirebaseIntialize()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('home'),
              1000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('LoginScreen'),
                1000
                )
            }
         });
    }
    FirebaseIntialize = () => {
        const firebaseConfig = {
              apiKey: "AIzaSyALM6dJrv55UoWD6xFcFoIHT8efu-lM3Sw",
              authDomain: "djsports-b4333.firebaseapp.com",
              databaseURL: "https://djsports-b4333.firebaseio.com",
              projectId: "djsports-b4333",
              storageBucket: "djsports-b4333.appspot.com",
              messagingSenderId: "913764974864",
              appId: "1:913764974864:web:251eff9ecd4198fec5e595",
              measurementId: "G-MQK3W3RT3J"
            }
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        console.log('Firebase App Created')
    }
render(){
    return(
        <ImageBackground source={require('../images/backgroundimage.jpg')} style={{width:'100%' , height:'100%',justifyContent:'center'}}>
            <Text style={style.text}>WELCOME TO</Text>
            <Text style={style.text}>DJSPORTS</Text>
        </ImageBackground>   
)}
}
const style = StyleSheet.create({
    text:{
        color:'white',
        fontSize:50,
        textAlign:'center'
    }
})