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
import EventCard from '../components/EventCard.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      db: firebase.firestore(),
      data:[],
      search: '',
      displayData: [],
      email : '',
      documentData: [],
            limit: 9,
            lastVisible: null,
            loading: false,
            refreshing: false,
            notfirstTime: true,
            direct: 'false',
            visible: false,

    }
    //console.log(this.state.db)
  }


  onFocusFunction = (email) => {
    //this.retrieveData(email)
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
      this.onFocusFunction(this.state.email)
  })
}

componentDidUpdate() {
  
}



componentWillUnmount() {
    this.focusListener.remove()
}




  /*
  retrieveData = async () => {
    let documentData =[]
    
    try {
        this.setState({loading:true})
       await this.state.db.collection("AllEvents").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                documentData.push(doc.data())
                console.log(doc.data());
            });
        });
        console.log(documentData)
        this.setState({
            data:documentData,
            displayData:documentData
        })
    }
    catch (error) {
      console.log(error);
    }
  };
    

    */

    
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



/*  retrieveData = async () => {
    try {
        // Set State: Loading
        this.setState({
            loading: true,
            direct: false
        });
        console.log('Retrieving Data');
        // Cloud Firestore: Query
        let initialQuery = await firebase.firestore().collection('AllEvents')
            .limit(this.state.limit)
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await initialQuery.get();
        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map(document => document.data());
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1].id;
        // Set State
        this.setState({
            documentData: documentData,
            //displayData: displayData,
            lastVisible: lastVisible,
            loading: false,
        });
    }
    catch (error) {
        console.log(error);
        this.setState({ loading: false, direct: true })

    }
};
// Retrieve More
retrieveMore = async () => {
    try {
        // Set State: Refreshing
        this.setState({
            refreshing: true,
        });
        console.log('Retrieving additional Data');
        // Cloud Firestore: Query (Additional Query)
        let additionalQuery = await firebase.firestore().collection('AllEvents')
            .startAfter(this.state.lastVisible)
            .limit(this.state.limit)
        // Cloud Firestore: Query Snapshot
        let documentSnapshots = await additionalQuery.get();
        // Cloud Firestore: Document Data
        let documentData = documentSnapshots.docs.map(document => document.data());
        // Cloud Firestore: Last Visible Document (Document ID To Start From For Proceeding Queries)
        let lastVisible = documentData[documentData.length - 1].id;
        // Set State
        this.setState({
            documentData: [...this.state.documentData, ...documentData],
           // displayData:[...this.state.displayData, ...documentData],
            lastVisible: lastVisible,
            refreshing: false,
        });
    }
    catch (error) {
        console.log(error);
    }
};*/


handleChange = async(search) => {
  let Data = []
  this.setState({displayData: []})
  try {
    this.setState({loading:true})
    console.log('searching for ',search)
    await this.state.db.collection('AllEvents')
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
            <TouchableOpacity onPress = {()=>navigate('ProfileSearch')}>
              <View>
                <Text>
                  Search People
                </Text>
              </View>
            </TouchableOpacity>
              <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" 
                   onChangeText={(search) => this.handleChange(search)}
                   />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
          
        </Header>
        
          {(this.state.loading)?<ActivityIndicator size='large'/>:null}
        
        <FlatList
         
          scrollEnabled={true}
          
          data= {this.state.displayData}
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
      ListHeaderComponent={this.renderHeader}
                    // Footer (Activity Indicator)
                    //ListFooterComponent={this.renderFooter}
                    // On End Reached (Takes a function)
                    //onEndReached={this.retrieveMore}
                    // How Close To The End Of List Until Next Data Request Is Made
                    //onEndReachedThreshold={0}
                    // Refreshing (Set To True When End Reached)
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

        />
           
            </View>
            
        );
    }
}
export default home;

