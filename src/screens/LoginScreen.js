import firebase from 'firebase'
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'
import ShadowView from 'react-native-simple-shadow-view/src/ShadowView';
import Icon from 'react-native-vector-icons/FontAwesome'
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      pass: '',
    }
  }
  // componentDidMount(){
  //   this.FirebaseIntialize()
  // }
  
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
      <ImageBackground source={require('../images/backgroundimage.jpg')} style={{height:'100%' , width:'100%'}}>
      <View style={style.container}>
        <Text style={style.header}>DJSPORTS</Text>
        <View style={{flexDirection:'row' ,  padding:5 ,}}>
        <Icon name="user" size={25} color="black" style={{paddingTop:10}} />
        <TextInput 
          placeholder='Login ID'
          placeholderTextColor='black'
          onChangeText={this.LoginId}
          keyboardType='email-address'
          textContentType='emailAddress'
          maxFontSizeMultiplier={100}
          style={style.textInput}
          >
        </TextInput>
        </View>
        <View style={{flexDirection:'row' , padding:5 , marginBottom:20 }}>
        <Icon name="lock" size={30} color="black" style={{paddingTop:9}} />
        <TextInput 
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor='black'
          onChangeText={this.Password}
          style={style.textInput}
          >
        </TextInput>
        </View>
        <Text></Text>
        <View style={{alignContent:'center',paddingLeft:0}}>
        <TouchableOpacity onPress={this.login} >
        <View style={style.button1}>
          <Text style={style.textbutton}>Log In</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signUp} >
          <View style={style.button2}>
          <Text style={style.textbutton}>Sign Up</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
    )
  }
}
const style = StyleSheet.create({
  container:{
    paddingLeft:10,
    paddingRight:10,
    borderRadius:20,
    margin:10,
    marginTop:150,
    backgroundColor:'white'
  },
  header:{
    paddingTop:30,
    fontSize:40,
    fontWeight:'bold',
    alignSelf:"center",
    padding:10,
    paddingBottom:40,
    color:'black',
    fontStyle:"italic"
  },
  textbutton:{
    fontSize:20,
    alignSelf:"center",
    color:'white'
  },
  textInput: {
    height:50,
    width:'90%',
    justifyContent:'center',
    paddingLeft:10,
    color:'black',
    borderBottomColor:'black', 
    borderBottomWidth:1,
},
button1:{
  backgroundColor: '#341f97',
  borderRadius:10,
  height:50,
  justifyContent:'center',
  paddingLeft:10,
  marginBottom:30
},
button2:{
  backgroundColor: '#341f97',
  borderRadius:10,
  height:50,
  justifyContent:'center',
  paddingLeft:10,
  marginBottom:40
},
})