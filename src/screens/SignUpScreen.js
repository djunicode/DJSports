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
    Picker
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
        console.log('Device info = ', devices)
        this.setState({
          userId: devices.userId
        })
      }
    Username = username => {
        this.setState({ username: username })
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
        console.log('checking')
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
        console.log(this.state.sports3)
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
        else
            this.setState({ check: false })



    }
    signUp = async() => {
        console.log(this.state.Id)
        await this.check()
        if (this.state.check) {
            console.log('happening')
            this.setState({ visible: false })
            if (this.state.pass == this.state.pass2) {
                firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                    .then(() => this.addusertodb())
                    .catch((e) => this.setState({
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
            console.log('not happeming')
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
        let arr = this.handleEventName(this.state.username)
        this.state.db.collection("Users").doc(this.state.Id).set({
            name: this.state.username,
            address: this.state.address,
            email: this.state.Id.toLowerCase(),
            image: '',
            rating: 'NA',
            sports: [this.state.sports1, this.state.sports2, this.state.sports3],
            teams: 0,
            wins: '0',
            year: this.state.year,
            branch: this.state.branch,
            keywords: this.state.keywords,
            OneSignalId : this.state.userId
        })
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <ImageBackground source={require('../images/backgroundimage.jpg')} style={{ height: '100%', width: '100%' }} >
                <ScrollView style={{ padding: 10, marginTop: 20 }}>
                    <View style={style.container}>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9, }} />
                            <TextInput
                                placeholder='User Name'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Username}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Address'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.address}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10 }}>
                            <Icon name="mortar-board" size={23} color="black" style={{ paddingTop: 10, paddingLeft: 8, }} />
                            <Picker
                                selectedValue={this.state.branch}
                                style={{ height: 50, width: 150 }}
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
                            <View style={{ flexDirection: 'row', padding: 0, marginBottom: 10, paddingLeft: 10, marginRight: 40 }}>
                                <Icon name="calendar" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                                <Picker
                                    selectedValue={this.state.year}
                                    style={{ height: 50, width: 100, borderBottomWidth: 1, borderBottomColor: 'black' }}
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
                                <Icon name="male" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 0, }} />
                                <Picker
                                    selectedValue={this.state.gender}
                                    style={{ height: 50, width: 150 }}
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
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sports1'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports1}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sports2'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports2}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10, }} />
                            <TextInput
                                placeholder='Sports3'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports3}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="user" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                placeholder='LoginId'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.LoginId}
                                autoCapitalize='none'
                                keyboardType='email-address'>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>
                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Password}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom: 10 }}>

                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12, }} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Re Enter your Password'
                                placeholderTextColor='black'
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
                                    this.state.error == '' ? 'Please fill up all the fields!' : this.state.error 
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
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    header: {
        paddingTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 10,
        paddingBottom: 40
    },
    textbutton: {
        fontSize: 20,
        alignSelf: "center",
        color: 'white'
    },
    textInput: {
        height: 50,
        width: '90%',
        justifyContent: 'center',
        paddingLeft: 10,
        color: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    button1: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        width:150,
        marginBottom: 10,
        marginRight:20,
        marginLeft:20
    },
    button2: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40,
        width:170
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