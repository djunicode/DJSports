import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

var db = firebase.firestore();


export default class MyEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            displayname: '',
            event_name : '',
            sport: '',
            no_people : '',
            venue : '',
            date: '',
            

        }
    }

    componentDidMount(){
        const user = firebase.auth().currentUser
        this.setState({email : user.email })
        console.log("success kinda")
        console.log(user.email)
        this.findEventName()
        //this.firebasegetdata(user.email)

      }
      findEventName = () => {
          // Create a reference to the SF doc.
        var sfDocRef = db.collection('CreatedEvent').doc(this.state.email);

        db.runTransaction(function(transaction) {
            return transaction.get(sfDocRef).then(function(sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }

                //var newPopulation = sfDoc.data().population + 1;
                console.log(sfDocRef.data())
            });
        }).then(function() {
            console.log("yes");
        }).catch(function(err) {
            // This will be an "population is too big" error.
            console.error(err);
        });

      }


      /*firebasegetdata = (email) => {
        console.log('Finding data')
      firebase.firestore().collection('CreatedEvent').doc(this.state.email).collection('MyEvent').where("event_name", "==", true)
  .get()
  .then(function(querySnapshot) {
      var userdata 
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          userdata = doc.data() 
          console.warn(userdata) 
          console.log('data Found')       
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
    }*/

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}>MY EVENTS</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    },
    header: {
        alignSelf: "center",
        fontStyle: "italic",
        fontSize: 40
    }

});
