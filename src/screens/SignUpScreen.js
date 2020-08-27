import * as firebase from 'firebase/app'
import React from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Picker,
    Alert,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import OneSignal from 'react-native-onesignal';
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: '',
            pass: '',
            pass2: '',
            username: '',
            address: '',
            textVisible: false,
            branch: 'mech',
            name : "",
            db: firebase.firestore(),
            year: '',
            sports1: '',
            sports2: '',
            sports3: '',
            visible: false,
            check: false,
            keywords : [],
            userId : '',
            error : '',
        }
    }
    componentDidMount = async() => {
        OneSignal.addEventListener('ids', this.onIds)
    }

    onIds = (devices) => {
        //console.log('Device info = ', devices)
        this.setState({
          userId: devices.userId
        })
      }
    Username = username => {
        this.setState({ username: username })
    }
    name = name => {
        this.setState({ name: name })
    }
    address = address => {
        this.setState({ address: address })
    }
    branch = branch => {
        this.setState({ branch: branch })
    }
    year = year => {
        this.setState({ year: year })
    }

    gender = gender => {
        this.setState({ gender: gender })
    }
    LoginId = Id => {
        this.setState({ Id: Id })
    }
    Password = pass => {
        this.setState({ pass: pass })
    }
    RePassword = pass2 => {
        this.setState({ pass2: pass2 })
    }

    check = () => {
        /*console.log('checking')
        console.log(this.state.username)
        console.log(this.state.address)
        console.log(this.state.branch)
        console.log(this.state.year)
        console.log(this.state.gender)
        console.log(this.state.Id)
        console.log(this.state.pass)
        console.log(this.state.pass2)
        console.log(this.state.sports1)
        console.log(this.state.sports2)
        console.log(this.state.sports3)*/
        if (this.state.username != '')
            this.setState({ check: true })
        else if (this.state.address != '')
            this.setState({ check: true })
        else if (this.state.branch != '')
            this.setState({ check: true })
        else if (this.state.year != '')
            this.setState({ check: true })
        else if (this.state.gender != '')
            this.setState({ check: true })
        else if (this.state.Id != '')
            this.setState({ check: true })
        else if (this.state.pass != '')
            this.setState({ check: true })
        else if (this.state.pass2 != '')
            this.setState({ check: true })
        else if (this.state.sports1 != '')
            this.setState({ check: true })
        else if (this.state.sports2 != '')
            this.setState({ check: true })
        else if (this.state.sports3 != '')
            this.setState({ check: true })
        else if (this.state.name != '')
            this.setState({ check: true })
        else
            this.setState({ check: false })



    }
    signUp = async() => {
        //console.log(this.state.Id)
        await this.check()
        if (this.state.check) {
            //console.log('happening')
            this.setState({ visible: false })
            if (this.state.pass == this.state.pass2) {
                firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                    .then(() => this.addusertodb())
                    .catch((e) => console.log(e),this.setState({
                        error : e,
                        visible : true
                    }))
            }
            else {

                this.setState({ textVisible: true })
            }
        }
        else {
            this.setState({ visible: true })
            //console.log('not happeming')
        }

    }
    login = () => {
        this.props.navigation.navigate('LoginScreen')
    }
    sports1 = sport => {
        this.setState({ sports1: sport })
    }
    sports2 = sport => {
        this.setState({ sports2: sport })
    }
    sports3 = sport => {
        this.setState({ sports3: sport })
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
    addusertodb = () => {
        ToastAndroid.show("Signing Up .....",ToastAndroid.LONG )
        let arr = this.handleEventName(this.state.name)
        this.state.db.collection("Users").doc(this.state.Id.toLowerCase()).set({
            name: this.state.name,
            address: this.state.address,
            email: this.state.Id.toLowerCase(),
            image: 'data:image/png;base64,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',
            rating: 'NA',
            sports: [this.state.sports1, this.state.sports2, this.state.sports3],
            teams: 0,
            wins: '0',
            year: this.state.year,
            branch: this.state.branch,
            keywords: this.state.keywords,
            OneSignalId : this.state.userId
        })
            .then(() => Alert.alert("SignUp Succesful"))
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <ImageBackground source={require('../images/infobkg2.jpeg')} style={{ height: '100%', width: '100%' }} >
                <ScrollView style={{ padding: 10, marginTop: 10 }}>
                    <View style={style.container}>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="user-circle" size={25} color="white" style={{ paddingTop: 10, paddingLeft: 9, }} />
                            <TextInput
                                placeholder='User Name'
                                placeholderTextColor='white'
                                style={style.textInput}
                                onChangeText={this.Username}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="#bdbdbd" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Address'
                                placeholderTextColor='#bdbdbd'
                                style={style.textInput}
                                onChangeText={this.address}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="user-circle" size={25} color="white" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='white'
                                style={style.textInput}
                                onChangeText={this.name}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10 }}>
                            <Icon name="mortar-board" size={23} color="#bdbdbd" style={{ paddingTop: 10, paddingLeft: 8, }} />
                            <Picker
                                selectedValue={this.state.branch}
                                style={{ height: 50, width: 150 , color:'#bdbdbd'}}
                                onValueChange={(itemValue, itemIndex) =>

                                    this.setState({ branch: itemValue })
                                    //console.log('branch issss ',this.state.branch)
                                }>
                                <Picker.Item label="Department" value="" />
                                <Picker.Item label="Computer" value="Computer" />
                                <Picker.Item label="IT" value="IT" />
                                <Picker.Item label="EXTC" value="EXTC" />
                                <Picker.Item label="Electronics" value="Electronics" />
                                <Picker.Item label="Chemical" value="Chemical" />
                                <Picker.Item label="Mechanical" value="Mechanical" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10, marginRight: 40 ,}}>
                                <Icon name="calendar" size={25} color="white" style={{ paddingTop: 10, paddingLeft: 10, }} />
                                <Picker
                                
                                    selectedValue={this.state.year}
                                    style={{ height: 50, width: 100, borderBottomWidth: 1, borderBottomColor: 'white', color: 'white' }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ year: itemValue })
                                        //console.log('gender issss ',this.state.gender)
                                    }>
                                    <Picker.Item label="Year" value="" />
                                    <Picker.Item label="FE" value="FE" />
                                    <Picker.Item label="SE" value="SE" />
                                    <Picker.Item label="TE" value="TE" />
                                    <Picker.Item label="BE" value="BE" />
                                </Picker>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10 }}>
                                <Icon name="male" size={25} color="white" style={{ paddingTop: 10, paddingLeft: 0, }} />
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{ height: 50, width: 150 , color: 'white'}}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ gender: itemValue })
                                    }>
                                    <Picker.Item label="Gender" value="" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="futbol-o" size={25} color="#bdbdbd" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sport 1'
                                placeholderTextColor='#bdbdbd'
                                style={style.textInput}
                                onChangeText={this.sports1}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="futbol-o" size={25} color="white" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sport 2'
                                placeholderTextColor='white'
                                style={style.textInput}
                                onChangeText={this.sports2}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="futbol-o" size={25} color="#bdbdbd" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sport 3'
                                placeholderTextColor='#bdbdbd'
                                style={style.textInput}
                                onChangeText={this.sports3}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="user" size={30} color="white" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                placeholder='Email Id'
                                placeholderTextColor='white'
                                style={style.textInput}
                                onChangeText={this.LoginId}
                                autoCapitalize='none'
                                keyboardType='email-address'>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="lock" size={30} color="#bdbdbd" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                placeholderTextColor='#bdbdbd'
                                style={style.textInput}
                                onChangeText={this.Password}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="lock" size={30} color="white" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Re Enter your Password'
                                placeholderTextColor='white'
                                style={style.textInput}
                                onChangeText={this.RePassword}>
                            </TextInput>
                        </View>
                        {
                            this.state.textVisible ? <Text style={{ alignSelf: 'center', color: 'red' }}>Password did not match</Text> : null
                        }
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
                                <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>
                                {
                                    (this.state.error == '') ? 'Please fill up all the fields!' : this.state.error 
                                }
                                </Text>
                            </DialogContent>
                        </Dialog>
                        <View style={{flexDirection:'row' , marginTop:10,marginBottom:10}}>
                        <TouchableOpacity onPress={this.signUp} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Sign Up</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.login} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Go To LogIn</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const style = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        //backgroundColor: '#FFFFFF',
        //paddingTop: 20
    },
    header: {
        //paddingTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 10,
        paddingBottom: 40
    },
    textbutton: {
        fontSize: 20,
        alignSelf: "center",
        color: 'white',
        fontFamily: 'Roboto-Black'
    },
    textInput: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        fontFamily: 'Roboto-Light',
        fontSize:16
    },
    button1: {
        backgroundColor: '#000',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        width:150,
        marginBottom: 10,
        marginRight:20,
        marginLeft:20,
        borderColor: '#00e676',
    borderWidth: StyleSheet.hairlineWidth,
    },
    button2: {
        backgroundColor: '#000',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40,
        width:170,
        borderColor: '#00e676',
    borderWidth: StyleSheet.hairlineWidth,
    },
    textInput1: {
        height: 50,
        width: 74,
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
})