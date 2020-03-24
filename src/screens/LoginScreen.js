import firebase from 'firebase'
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import OneSignal from 'react-native-onesignal';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      pass: '',
      userId: '',
      date : ''
    }
  }
  componentDidMount =  async() => {
    OneSignal.addEventListener('ids' , this.onIds)
    var d = Date(Date.now())
    this.setState({date : d.toString()})
  }

  onIds = (devices) =>{
    console.log('Device info = ' , devices)
    this.setState({
      userId : devices.userId
    })
  }
  LoginId = Id => {
    this.setState({ Id: Id })
  }
  Password = pass => {
    this.setState({ pass: pass })
  }
  navsidnout = () => {
    this.props.navigation.navigate('home')
  }
  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.Id, this.state.pass)
      .then(
        () => this.props.navigation.navigate('home')
      )
  }
  signUp = () => {
    this.props.navigation.navigate('SignUpScreen')
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