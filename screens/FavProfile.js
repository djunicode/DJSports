import React, { Component } from 'react';
import { Image,View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';
export default class ProfileDetails extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            iconname:"ios-timer",
            db:firebase.firestore(),
            email:'',
            joined: 0,
            num: 0,
            limit_reached: false,
            registered: false,
            visible: false,
            isFavorite : false,
            update : ""
        };
        
      }

      static navigationOptions = {
        headerShown:false
    }
    componentDidMount(){
     
      const user = firebase.auth().currentUser
      const doc = this.state.db.collection("Users").doc(user.email)
      var {params} = this.props.navigation.state
      var t 
     
      firebase
      .firestore()
      .collection("Users").doc(user.email)
      .get()
      .then((querySnapshot) => { 
        console.log("out snap") //Notice the arrow funtion which bind `this` automatically.
         
          console.log("In snap")
          var favs,t;
          favs = querySnapshot.get("favorites")
          t = favs.includes(params.item.name || params.item.email)
          console.log("name " +params.item.name)
          console.log(t+ favs)
          this.setState({ isFavorite: t });   //set data in state here
      
          console.log(this.state.isFavorite)
          console.log(user.email)
      
      });

  }
    addFav=()=>{
      var {params} = this.props.navigation.state
      const user = firebase.auth().currentUser
      let id = user.email
      
      const  arrayUnion = firebase.firestore.FieldValue.arrayUnion;
        const doc = this.state.db.collection("Users").doc(id)
        doc.update({
        favorites : arrayUnion(params.item.email)
        });
        this.setState(
          {
            isFavorite : true
          }
        )
        
       }

       remFav=()=>{
        var {navigate} = this.props.navigation;
        var {params} = this.props.navigation.state
        const user = firebase.auth().currentUser
        let id = user.email
        
        const  arrayRemove = firebase.firestore.FieldValue.arrayRemove;
          const doc = this.state.db.collection("Users").doc(id)
          doc.update({
          favorites : arrayRemove(params.item.email)
          }).then(
             ()=> navigate("ProfileSearch")
          )
          



       }


  
   
    


  

    render() {
      
    var {params} = this.props.navigation.state
    return (
      <Container >
        
        <Content>
          <Card style={{flex: 0}}>
            <CardItem style={{backgroundColor:'#4d4d4d'}}>
              <Left>
                <Image source={require("../assets/profile-pic.jpg")} style={{height:55,width:55,borderRadius:100}} />
                <Body>
                  <Text style={{fontSize:25}}>{params.item.name}</Text>
                  <Text note style={{fontSize:15}}>{params.item.year}-{params.item.branch}</Text>
                </Body>
              </Left>
              <Right>
                  <Text note style={{fontSize:15}}>Creator</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body style={{alignItems:'stretch'}}>
                <View>
                    <Text styles={{fontWeight:'bold'}}>Sports :</Text>
                <Text style={[styles.text,{paddingBottom:2}]}>
                    { params.item.sports.map((item1, key)=>(
                        <Text key={key} >{item1}{"\n"}</Text>)
                        )}
                </Text> 
                    <Text>
                        Rating : {params.item.ratings}{"\n"}
                        Teams  : {params.item.teams}{"\n"}
                        Wins   : {params.item.wins}{"\n"}
                    </Text>
                </View>
              </Body>
           
            </CardItem>
           
            <View>
            {/* <Text>
              {params.item.name} is already in your favorites!
            </Text> */}
            <TouchableOpacity onPress ={this.remFav}>
              <View>
                <Text>Remove From favorites</Text>
              </View>
            </TouchableOpacity>
            </View>
            
        
    
          </Card>
         
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
});