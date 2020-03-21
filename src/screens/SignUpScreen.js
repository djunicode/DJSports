import * as firebase from 'firebase/app'
import React from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    RefreshControl
} from 'react-native';
import ShadowView from 'react-native-simple-shadow-view'
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
            branch : '',
            db : firebase.firestore(),
            year : '',
            sports1 : '',
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
        this.setState({branch : branch})
    }
    year = year => {
        this.setState({year:year})
    }

    gender = gender => {
        this.setState({gender : gender})
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
        this.setState({sports1:sport})
    }
    sports2 = sport => {
        this.setState({sports2:sport})
    } 
    sports3 = sport => {
        this.setState({sports3:sport})
    }
    addusertodb = () => {
        this.state.db.collection("Users").doc(this.state.username).set({
            name: this.state.username,
            address: this.state.address,
            email:this.state.Id.toLowerCase(),
            image : '',
            rating : 'NA',
            sports : [this.state.sports1,this.state.sports2,this.state.sports3],
            teams : 0,
            wins : '0',
            year : this.state.year,
            branch : this.state.branch
        })
        .then(() => this.props.navigation.navigate('LoginScreen'))
        .catch((e) => console.log(e))        
    }
    render() {
        return (
            <View >
                <TextInput
                    placeholder='User Name'
                    placeholderTextColor='black'
                    onChangeText={this.Username}>
                </TextInput>
                <TextInput 
                    placeholder='Address'
                    placeholderTextColor='black'
                    onChangeText={this.address}>
                </TextInput>
                <TextInput 
                    placeholder='Branch'
                    placeholderTextColor='black'
                    onChangeText={this.branch}>
                </TextInput>
                <TextInput 
                    placeholder='Year'
                    placeholderTextColor='black'
                    onChangeText={this.year}>
                </TextInput>
                <TextInput 
                    placeholder='Gender'
                    placeholderTextColor='black'
                    onChangeText={this.gender}>
                </TextInput>
                <TextInput 
                    placeholder='Sports1'
                    placeholderTextColor='black'
                    onChangeText={this.sports1}>
                </TextInput><TextInput 
                    placeholder='Sports2'
                    placeholderTextColor='black'
                    onChangeText={this.sports2}>
                </TextInput><TextInput 
                    placeholder='Sports3'
                    placeholderTextColor='black'
                    onChangeText={this.sports3}>
                </TextInput>
                <TextInput 
                    placeholder='LoginId'
                    placeholderTextColor='black'
                    onChangeText={this.LoginId}
                    keyboardType = 'email-address'
                    >
                </TextInput>
                <TextInput 
                    secureTextEntry={true}
                    placeholder='Enter Password'
                    placeholderTextColor='black'
                    onChangeText={this.Password}>
                </TextInput>
                <TextInput 
                    secureTextEntry={true}
                    placeholder='Re Enter your Password'
                    placeholderTextColor='black'
                    onChangeText={this.RePassword}>
                </TextInput>
                {
                    this.state.textVisible ? <Text>Password did not match</Text> : null
                }
                <Button
                    title="Sign Up"
                    onPress={this.signUp}
                />
                <Button
                    title='Go to Login Page'
                    onPress={this.login} />
            </View>
        )
    }
}