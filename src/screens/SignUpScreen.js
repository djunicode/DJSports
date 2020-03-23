import * as firebase from 'firebase/app'
import React from 'react';
import {
    View,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import 'firebase/firestore'
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
            branch: '',
            db: firebase.firestore(),
            year: '',
            sports1: '',
            sports2: '',
            sports3: ''
        }
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
    signUp = () => {
        console.log(this.state.Id)
        if (this.state.pass == this.state.pass2) {
            firebase.auth().createUserWithEmailAndPassword(this.state.Id, this.state.pass)
                .then(() => this.addusertodb());
        }
        else {
            this.setState({ textVisible: true })
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
    addusertodb = () => {
        this.state.db.collection("Users").doc(this.state.username).set({
            name: this.state.username,
            address: this.state.address,
            email: this.state.Id.toLowerCase(),
            image: '',
            rating: 'NA',
            sports: [this.state.sports1, this.state.sports2, this.state.sports3],
            teams: 0,
            wins: '0',
            year: this.state.year,
            branch: this.state.branch
        })
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <ImageBackground source={require('../images/backgroundimage.jpg')} style={{ height: '100%', width: '100%' }} >
                <ScrollView style={{ padding: 10 , marginTop:20 }}>
                    <View style={style.container}>
                        <View style={{ flexDirection: 'row',  padding: 5,marginBottom:10 }}>
                            <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9,  }} />
                            <TextInput
                                placeholder='User Name'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Username}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>

                            <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                            <TextInput
                                placeholder='Address'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.address}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row',  padding: 5,  marginBottom:10 , marginRight:10}}>
                                <Icon name="mortar-board" size={23} color="black" style={{ paddingTop: 10, paddingLeft: 8, }} />
                                <TextInput
                                    placeholder='Branch'
                                    placeholderTextColor='black'
                                    style={style.textInput1}
                                    onChangeText={this.branch}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 5, marginBottom:10, marginRight:10 }}>
                                <Icon name="calendar" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                                <TextInput
                                    placeholder='Year'
                                    placeholderTextColor='black'
                                    style={style.textInput1}
                                    onChangeText={this.year}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                                <Icon name="male" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                                <TextInput
                                    placeholder='Gender'
                                    placeholderTextColor='black'
                                    style={style.textInput1}
                                    onChangeText={this.gender}>
                                </TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                            <TextInput
                                placeholder='Sports1'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports1}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                            <TextInput
                                placeholder='Sports2'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports2}>
                            </TextInput>
                            </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                            <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} />
                            <TextInput
                                placeholder='Sports3'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.sports3}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                            <Icon name="user" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} />
                            <TextInput
                                placeholder='LoginId'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.LoginId}
                                keyboardType='email-address'>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Enter Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.Password}>
                            </TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>

                            <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} />
                            <TextInput
                                secureTextEntry={true}
                                placeholder='Re Enter your Password'
                                placeholderTextColor='black'
                                style={style.textInput}
                                onChangeText={this.RePassword}>
                            </TextInput>
                        </View>
                        {
                            this.state.textVisible ? <Text>Password did not match</Text> : null
                        }
                        <TouchableOpacity onPress={this.signUp} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.login} >
                            <View style={style.button1}>
                                <Text style={style.textbutton}>Go To Log In Screen</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        )
    }
}
const style = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight:10,
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
        height:50,
        width:'90%',
        justifyContent:'center',
        paddingLeft:10,
        color:'black',
        borderBottomColor:'black', 
        borderBottomWidth:1
    },
    button1: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 10,
    },
    button2: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40
    },
    textInput1: {
        height:50,
        width:74,
        justifyContent:'center',
        paddingLeft:10,
        color:'black',
        borderBottomColor:'black', 
        borderBottomWidth:1
    },
})