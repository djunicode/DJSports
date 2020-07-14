import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

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
      favlist:[],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,

    }
  
  }
  handleChange = async(search) => {
    let Data = []
    let FavList = []
    FavList = this.state.favlist
    
    this.setState({displayData: []})
    try {
      this.setState({loading:true})
      await this.state.db.collection('Users')
          .where('keywords','array-contains',search)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              let email_token = doc.data().email
              if ( email_token!=firebase.auth().currentUser.email)
              
              {
                if (FavList.includes(email_token))
                {
                  Data.push(doc.data());
                } 
               
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

onFocusFunction = () => {
  var incoming_favs = []
  
  var email = firebase.auth().currentUser.email
  console.log(email)
  console.log("i am focused in favs")
  firebase
    .firestore()
    .collection("Users").doc(email)
    .get()
    .then((querySnapshot) => { 
        
        
        incoming_favs = querySnapshot.get("favorites")
        console.log("In on focus")
        console.log(incoming_favs)
        this.setState(
            {
              favlist:incoming_favs
            }
        )
        this.handleChange('')
})
    

}



componentDidMount() {
  console.warn = () => {};
  
  const user = firebase.auth().currentUser
  this.setState({ email: user.email })
  const {state} = this.props.navigation;
  console.log(user.email)
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
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
          
            
            <View style = {{flex:1, backgroundColor:'black'}}>
              
              
        
          {(this.state.loading)?<ActivityIndicator size='large'/>:null}
        

        {(Array.isArray(this.state.displayData) && this.state.displayData.length!=0)?
           <View style = {{marginTop: 10}}>
         
          <FlatList
          scrollEnabled={true}
          
          data= {this.state.displayData}
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
        
         </View>
         :
        <View>
        
            <Text style = {
              {
              color: 'white',
              fontWeight:"bold",
              paddingLeft:40,
              paddingTop : 60,
              fontSize : 20,
              width: 300,
              alignSelf:"center"
          
          }}>
            You have no Favorites</Text>
        <TouchableOpacity onPress = {()=> navigate("ProfileSearch")}
        style={
          {paddingLeft:85,
          paddingTop:20}
        }
        >
                <Text style ={{textAlign:"center",margin:10 , backgroundColor:'#00e676' , padding:8 ,width:180, justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}
                > Find people?</Text>
        </TouchableOpacity>
        </View>
        }
    
       
            </View>
            
      );
    
}}
export default Favorites;
