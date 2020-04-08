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

class ProfileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: firebase.firestore(),
      data:[],
      search: '',
      displayData: [],
     
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
    console.log("i am focused")
    this.handleChange('')

}



componentDidMount() {


    const user = firebase.auth().currentUser
    this.setState({ email: user.email })
    
    console.log("success kinda")
    console.log(user)
    //this.firebasegetdata(user.email)
    //this.retrieveData(user.email)
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






handleChange = async(search) => {
  let Data = []
  this.setState({displayData: []})
  try {
    this.setState({loading:true})
    console.log('searching for ',search)
    await this.state.db.collection('Users')
        .where('keywords','array-contains',search)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              Data.push(doc.data());
              
          
          });
      })
      console.log(Data)
      this.setState({
       //documentData: Data,
       displayData:Data,
        loading:false,

      },console.log(this.state.displayData));
      //Data=[]
      

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
            <View style = {{flex:1}}>
              <Header searchBar rounded>
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
        
          {(this.state.loading)?<ActivityIndicator size='large'/>:null}
        
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
    }
}
export default ProfileSearch;

