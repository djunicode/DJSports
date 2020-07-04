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

import {Container,Header,Item,Icon,Input,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
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
          console.log("In on focus")
          console.log(typeof(incoming_favs))
          
          incoming_favs.forEach(
            
            async (elem)=>{
              if (elem !=firebase.auth().currentUser.email)
              { firebase
                .firestore()
                .collection("Users").doc(elem)
                .get()
                .then((querySnapshot) => { 
                   
          this.setState({
            data: [
              ...this.state.data,
              querySnapshot.data()
            ]
          })
          
                  });
                  
              
              }
          
          })})
            
      
    this.handleChange('')

     
}



componentDidMount() {
  console.warn = () => {};

    const user = firebase.auth().currentUser
    this.setState({ email: user.email })
   
    console.log("success kinda")
    
 
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.onFocusFunction(user.email)
    })
   

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


showFav = async() => {
  let data  = []
  console.log("in showfav")
  console.log("This is the list of"+this.state.favs)
  await this.state.favs.forEach(
  async (elem)=>{
    
  firebase
  .firestore()
  .collection("Users").doc(elem)
  .get()
  .then((querySnapshot) => { 
    
   
    
   this.setState(
     {
       favData :[ ...this.state.favData, querySnapshot.data() ]
     }
   )

    });
    
   
}).then(this.setState({
  data : data
}))

console.log("The final data")
console.log(this.state.data)

 
console.log("Check data")

console.log(this.state.favData)
}

handleChange = async(search) => {
  let Data = []
  this.setState({displayData: []})
  try {
    this.setState({loading:true})
    // console.log('searching for ',search)
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
              
          {/* {(this.state.loading)?<ActivityIndicator size='large'/>:null} */}
        <View>
     
      
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
    
}}
export default ProfileSearch;

/* <View>
            <TouchableOpacity onPress = {()=>navigate("Favorites",)}>
                <Text style = {{color: 'white'}}>Favorites</Text> 
            </TouchableOpacity>
    
    </View>*/
