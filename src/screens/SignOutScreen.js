import * as firebase from 'firebase/app'
import React from 'react';
import {
  View,
  Button,
  Text
} from 'react-native';
import 'firebase/firestore'

export default class SignOutScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          displayname: '',
          userdata : {}
        }
      }
    componentDidMount(){
        const user = firebase.auth().currentUser
        this.setState({email : user.email ,displayname: user.displayname})
        this.firebasegetdata(user.email)
      }
      firebasegetdata = (email) => {
          console.log('Finding data')
        firebase.firestore().collection("Users").where("email", "==", email)
    .get()
    .then(function(querySnapshot) {
        var userdata 
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            userdata = doc.data() 
            console.warn(userdata) 
            console.log('data Found')   
            .then(this.setState({ userdata: userdata}))
    
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
      }
    signout = () =>{
        firebase.auth().signOut().then(
            () => this.props.navigation.navigate('LoginScreen')
        )
    }
    render(){
        return(
            <View style ={{flex:1 ,alignContent:"center"}}>
                <Text style = {{fontSize:50}}>Welcome</Text><Text style={{fontSize:20}}>{this.state.email}</Text>
                <Text style = {{fontSize:50}}>{this.state.displayname}</Text>
                <Button 
                    onPress={() => this.signout()}
                    title = 'SignOut'
                />
            </View>
        )
    }
}