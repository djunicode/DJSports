import firebase from 'firebase'
import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'
import ShadowView from 'react-native-simple-shadow-view/src/ShadowView';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      pass: '',
    }
  }
  componentDidMount(){
    this.FirebaseIntialize()
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
  
  LoginId = Id => {
    this.setState({ Id: Id })
  }
  Password = pass => {
    this.setState({ pass: pass })
  }
  navsidnout = () => {
    this.props.navigation.navigate('SignOut')
  }
  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.Id, this.state.pass)
      .then(
        () => this.props.navigation.navigate('SignOut')
      )
  }
  signUp = () => {
    this.props.navigation.navigate('SignUpScreen')
  }
    googleLogin = async() =>  {
    try {
      this.firebaseinit
      console.log("Google login begins")
      // add any configuration settings here:
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        offlineAccess: true,
        webClientId:"244201229732-rgk2sqts94akiptkghgtk9kko6mmic4n.apps.googleusercontent.com",   
      });
      console.log("Login Configured")
      const data = await GoogleSignin.signIn()
      console.log(data)
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      console.log("Google Logged in")
      this.props.navigation.navigate('SignOut')
      
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={{padding:10,paddingTop:100}}>
      <View style={style.container}>
        <Text style={style.header}>WELCOME TO</Text>
        <Text style={style.header}>DJSPORTS</Text>
        <ShadowView style={style.textInput}>
        <TextInput 
          placeholder='LoginId'
          placeholderTextColor='black'
          onChangeText={this.LoginId}
          keyboardType='email-address'
          >
        </TextInput>
        </ShadowView>
        <Text></Text>
        <ShadowView style={style.textInput}>
        <TextInput 
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor='black'
          onChangeText={this.Password}>
        </TextInput>
        </ShadowView>
        <Text></Text>
        <View style={{alignContent:'center',paddingLeft:0}}>
        <TouchableOpacity onPress={this.login} >
        <ShadowView style={style.button}>
          <Text style={style.textbutton}>Log In</Text>
        </ShadowView>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signUp} >
          <ShadowView style={style.button}>
          <Text style={style.textbutton}>Sign Up</Text>
          </ShadowView>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    )
  }
}
const style = StyleSheet.create({
  container:{
    paddingLeft:10,
    paddingRight:10,
    borderColor:'#7ba7ed',
    borderWidth:10,
    borderRadius:10
  },
  header:{
    fontSize:30,
    alignSelf:"center",
    padding:10,
    paddingBottom:30
  },
  textbutton:{
    fontSize:20,
    alignSelf:"center",
    color:'white'
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    shadowColor: '#E7EAF0',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {width: 3,height: 3},
    paddingLeft:10,
    marginBottom:20,
},
button:{
  backgroundColor: '#7ba7ed',
  borderRadius:30,
  height:50,
  justifyContent:'center',
  shadowColor: '#E7EAF0',
  shadowOpacity: 1,
  shadowRadius: 2,
  shadowOffset: {width: 3,height: 3},
  paddingLeft:10,
  marginBottom:20
}
})