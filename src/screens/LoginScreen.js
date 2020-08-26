import firebase from 'firebase'
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import OneSignal from 'react-native-onesignal';
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Id: '',
      pass: '',
      userId: '',
      date: '',
      visible: false,
      context: '',
    }
  }
  componentDidMount = async () => {
    OneSignal.addEventListener('ids', this.onIds)
    var d = Date(Date.now())
    this.setState({ date: d.toString() })
  }
  //onIds is a one-signal function which takes required info of the device
  onIds = (devices) => {
    //console.log('Device info = ', devices)
    this.setState({
      userId: devices.userId
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
  signIn = async() => {
    await firebase.firestore().collection("Users").doc(this.state.Id).update({
      OneSignalId : this.state.userId
    })
    this.props.navigation.navigate('home')
  }
  login = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.Id, this.state.pass)
      .then(
        () => this.signIn()
      ).catch((e) => this.check(e))
  }
  check = (e) => {
    this.state.visible = true
    this.setState({
      context : e
    })
  }
  signUp = () => {
    this.props.navigation.navigate('SignUpScreen')
  }
  render() {
    console.disableYellowBox = true
    return (
      <ImageBackground source={require('../images/infobkg2.jpeg')} style={{ height: null, width: null , flex:1 , justifyContent:'center' }}>
        <View style={style.container}>
        <Image 
                source={require('../images/logo2.png')}
                style = {{ height:150, width: null , margin:30 , marginBottom:50,marginTop:50, borderRadius:8}}
            />
          <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
            <Icon name="user" size={25} color="#bdbdbd" style={{ paddingTop: 10 }} />
            <TextInput
              placeholder='Login ID'
              placeholderTextColor='#fff'
              
              onChangeText={this.LoginId}
              keyboardType='email-address'
              textContentType='emailAddress'
              maxFontSizeMultiplier={100}
              autoCapitalize='none'
              style={style.textInput}
            >
            </TextInput>
          </View>
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
            })}>
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>{this.state.context.toString()}</Text>
            </DialogContent>
          </Dialog>
          <View style={{ flexDirection: 'row', padding: 5, marginBottom: 30 }}>
            <Icon name="lock" size={30} color="#bdbdbd" style={{ paddingTop: 9 }} />
            <TextInput
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='#fff'
              onChangeText={this.Password}
              style={style.textInput}
            >
            </TextInput>
          </View>
          <Text></Text>

          <View style={{ alignContent: 'center', paddingLeft: 0 ,flexDirection:'row' }}>
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
  container: {
    //paddingLeft: 10,
    //paddingRight: 10,
    //borderRadius: 20,
    //margin: 10,
    //backgroundColor: 'white',
    justifyContent:'center'
  },
  header: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: "center",
    padding: 10,
    paddingBottom: 40,
    color: 'black',
    fontStyle: "italic"
  },
  textbutton: {
    fontSize: 20,
    alignSelf: "center",
    color: 'white',
    textAlign:'center',
    fontFamily: 'Roboto-Black'
  },
  textInput: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 10,
    color: 'white',
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
    fontFamily: 'Roboto-Light',
    fontSize:17
  },
  button1: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 30,
    marginRight:20,
    width:150,
    alignContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginLeft:20,
    borderColor: '#00e676',
    borderWidth: StyleSheet.hairlineWidth,
    
  },
  button2: {
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 40,
    width:150,
    borderColor: '#00e676',
    borderWidth: StyleSheet.hairlineWidth

  },
})