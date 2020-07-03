import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import {Container,Header,Item,Icon,Input,Body,CheckBox,Title,Card,CardItem,Left,Right,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import ProfileCard from '../components/ProfileCard.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

class Favorites extends Component {
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
              
            firebase
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
              
           
          })
       
 
      
    this.handleChange('')

     
})
}



componentDidMount() {
  console.warn = () => {};

    const user = firebase.auth().currentUser
    this.setState({ email: user.email })
    
    console.log("success kinda")
    this.onFocusFunction(user.email)
    // this.focusListener = this.props.navigation.addListener('didFocus', () => {
        
    // })
  
  

}

componentWillUnmount() {
    // this.focusListener.remove()
} 
renderFooter = () => {
      try {
          // Check If Loading
          if (this.state.loading) {
              return (
                  <View style = {{flex:1, justifyContent:'center', marginTop:300}}>
                    <ActivityIndicator size="large" color="#1a237e"/>
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
    
    // console.log("My DATA"+querySnapshot.data().email)
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      
    //  data.push(querySnapshot.data())
    
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
// ).then(
//   ()=> this.setState(

//   { favData : data,
//     loading : false
//   }

// ))
 
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
              // doc.data() is never undefined for query doc snapshots
              // console.log(doc.id, " => ", doc.data());
              Data.push(doc.data());
              
          
          });
      })
      // console.log(Data)
      this.setState({
       //documentData: Data,
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
remAll =  () => {
    var {navigate} = this.props.navigation;
    const user = firebase.auth().currentUser
    let id = user.email
    const doc = this.state.db.collection("Users").doc(id)
    doc.update({
    favorites : []
    })
}

render() {
        console.disableYellowBox = true
        var {navigate} = this.props.navigation;
        return (
          
            
            <View style = {{flex:1}}>
              
              
        
          {(this.state.loading)?<ActivityIndicator size='large'/>:null}
        <View>
        
          <Text>
            favorites
          </Text>
          
        </View>

        {(Array.isArray(this.state.data) && this.state.data.length!=0)?
           <View>
          <FlatList
        //   onDidFocus = {()=>this.onFocusFunction(firebase.auth().currentUser.email)}
          scrollEnabled={true}
          
          data= {this.state.data}
          renderItem={({ item }) => 
          <TouchableOpacity onPress = {
            ()=>navigate("FavProfile",{item})
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
        {/* <TouchableOpacity onPress = {this.remAll()}>
              <Text>Remove All favorites</Text>
          </TouchableOpacity> */}
         </View>:
        <View>
        <Text>You have no Favorites</Text>
        <TouchableOpacity onPress = {()=> navigate("ProfileSearch")}>
                <Text> Add People to your favorites?</Text>
        </TouchableOpacity>
        </View>
        }
    
       
            </View>
            
      );
    
}}
export default Favorites;


