import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ImageBackground} from 'react-native';
import firebase from 'firebase'

export default class SplashScreen extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount = async() =>{
        this.FirebaseIntialize()
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              setTimeout(
              () => this.props.navigation.navigate('SignOut'),
              2000
              )
            }else{
                setTimeout(
                () => this.props.navigation.navigate('LoginScreen'),
                2000
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