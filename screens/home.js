import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";

import {Container,Header,Item,Icon,Input,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import EventCard from '../components/EventCard.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: firebase.firestore(),
      data:[]
    }
    //console.log(this.state.db)
  }
  componentDidMount(){
    const user = firebase.auth().currentUser
    this.setState({email : user.email })
    console.log(user.email)
    let documentData =[]
    this.retrieveData(documentData)
    //console.log(documentData)
  }
 
  retrieveData = async (documentData) => {
    try {
        
       await this.state.db.collection("AllEvents").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                documentData.push(doc.data())
                console.log(doc.data());
            });
        });
        console.log(documentData)
        this.setState({
            data:documentData
        })
    }
    catch (error) {
      console.log(error);
    }
  };
    static navigationOptions = {
        headerShown:false
    }
    render() {
        var {navigate} = this.props.navigation;
        return (
            <View>
              <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList
         
          scrollEnabled={true}
        
          data= {this.state.data}
          renderItem={({ item }) => 
          <TouchableOpacity onPress = {
              ()=>navigate("details",{item})
          }>
        <EventCard 
          Sport = {item.sport}
          EventName = {item.event_name}
          place = {item.venue}
          Date={item.date}
        >
      </EventCard>
      </TouchableOpacity>
      }
        />
           
            </View>
            
        );
    }
}
export default home;

