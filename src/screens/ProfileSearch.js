import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,StatusBarStyle
} from "react-native";

import {Header,Item,Icon,Input,Button} from 'native-base'
import ProfileCard from '../components/ProfileCard.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: firebase.firestore(),
      data:[],
      search: '',
      displayData: [],
      favs : [],
      favData : [],
      documentData: [],
      favList :[],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,

    }
  
  }
 

onFocusFunction = (email) => {
    
    const user = firebase.auth().currentUser
    console.log("i am focused")
    firebase
      .firestore()
      .collection("Users").doc(email)
      .get()
      .then((querySnapshot) => { 
          
          var incoming_favs = []
          incoming_favs = querySnapshot.get("favorites")
          this.setState(
            {
                favList : incoming_favs
            }
          )
        })
    
            
      
    this.handleChange('')

     
}



componentDidMount() {
  console.warn = () => {};

    const user = firebase.auth().currentUser
    this.setState({ email: user.email })
    // const {state} = this.props.navigation;
    // this.retData(state.params.event_name)
   
    console.log("SSSSS kinda")
    
 
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.onFocusFunction(user.email)
    })
   

}

retData=async(item)=>{
 
  var docRef = this.state.db.collection("AllEvents").doc(item);

  await docRef.get().then((doc)=> {
      this.setState({
          data2:doc.data()
      })
      console.log("Below is the data2.")
       console.log(this.state.data2)
      }).catch(function(error) {
              console.log("Error getting document:", error);
  });
}
componentWillUnmount() {
    this.focusListener.remove()
} 
renderFooter = () => {
      try {
          // Check If Loading
          if (this.state.loading) {
              return (
                  <View style = {{flex:1, justifyContent:'center', marginTop:300}}>
                    {/* <ActivityIndicator size="large" color="#1a237e"/> */}
                  </View>
              )
          }
          else {
              return null;
          }
      }
      catch (error) {
          console.log(error);
      }
  };
 static navigationOptions = {
    headerShown:false
}




handleChange = async(search) => {
  let Data = []
  this.setState({displayData: []})
  try {
    this.setState({loading:true})
    await this.state.db.collection('Users')
        .where('keywords','array-contains',search)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.data().email !=firebase.auth().currentUser.email)
            
            {
               Data.push(doc.data());
            
            } 
              
          
          });
      })
    
      this.setState({
   
       displayData:Data,
        loading:false,

      },

      );
   
      

    
  }
 
 catch (error) {
   console.log(error);
 }
}
handleRefresh = () => {
  try {
    this.setState({refreshing:true})

    this.handleChange('')
    
    this.setState({
        
        refreshing:false
    })
}
catch (error) {
  console.log(error);
}
}

render() {
        console.disableYellowBox = true
        var {navigate} = this.props.navigation;
        return (
          
            
            <View style = {{flex:1, backgroundColor: 'black'}} >
 <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />              
        <View>
          <View>
            <Text style = {
              {
              color: '#D3D3D3',
              //fontWeight:"bold",
              //paddingStart: 20,
              paddingTop : 10,
              fontSize : 18,
              //width: 300,
              fontFamily: 'Roboto-Light',
              alignSelf: 'center'
          
          }}>
              Who do you want to play with?
            </Text>
          </View>
      
          <Header searchBar rounded style = {{backgroundColor: 'black', marginTop:10, marginBottom:10}}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search people" 
                   onChangeText={(search) => this.handleChange(search)}
                   />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search </Text>
          </Button>
          
        </Header>
        </View>
       
           
       
    <FlatList
          
          scrollEnabled={true}
          
          data= {this.state.displayData}
          renderItem={({ item }) => 
          <TouchableOpacity onPress = {
            ()=>navigate("ProfileDetails",{item})
        }>
        <ProfileCard
            image  = {require('../../assets/media2.jpg')}
          Name = {item.name}
          Sports = {item.sports}
          Ratings = {item.rating}
          Branch={item.branch}
          Year = {item.year}
          // Fav = {this.state.favList.includes(item.email)?true:false}
        
        >
      </ProfileCard>
    </TouchableOpacity>
    
      }
      ListHeaderComponent={this.renderHeader}
                   
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

        />
           
           
            </View>
            
      );
    
}

}
export default ProfileSearch;

