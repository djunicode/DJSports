import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,FlatList
} from "react-native";

import {Container,Header,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import TeamCard1 from '../components/TeamCard1'
import TeamCard from '../components/TeamCard'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

class Select extends Component {
   
    constructor(props){
        super(props)
        this.state={
            db : firebase.firestore(),
            sports : this.props.navigation.state.params,
            data : []
         }
        
    //     console.log('In constructor')
    //     var dataBase
    //     dataBase =[]
    //     this.state.db.collection("Users").where("sports", "==", 'Volleyball')
    // .get()
    // .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         // this.setState(prevState => ({
    //         //     data: [...prevState.data, doc.data()]
    //         //   }))
            
    //         dataBase.push(doc.data())
    //         // console.log(doc.id, " => ", doc.data());
    //         // // console.log(this.state.data)
    //         console.log('Inside constructor')
    //         console.log(dataBase)
    //     });
        
    // }).then(
    //     this.state={
    //         data : dataBase
    //     }
    // ).then(
    //     console.log('Check'),
    //     console.log(this.dataBase)
    // )
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
    
    
   
}


componentDidMount = () => {
    this.state.db.collection("Users").where("sports", "==", 'Volleyball').get().then((snapshot) => (
        snapshot.forEach((doc) => (
            this.setState((prevState) => ({
                data: [...prevState.data, doc.data()]
            }))
        ))
    ))
}


   
    
  
    render() {
        console.log('In render')
        console.log(this.state.data)
        
        

        
        return (
          
            <View>
                
            <Header style = {{backgroundColor: 'blue'}}/>
            <Text>Check text here =</Text>
              <FlatList
       
        scrollEnabled={true}
      
        data={this.state.data}

        renderItem={({ item }) => <TeamCard image  = {require('../assets/media2.jpg')}
        teamDetails = {item.sports}
        teamName = {item.name}
        moreDetails = {item.year}
    >
    </TeamCard>}
        keyExtractor={item => item.name}
      />
         
          </View>
        );
    }
    
}
export default Select;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});