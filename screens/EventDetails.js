import React, { Component } from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconname:"ios-timer",
            db:firebase.firestore(),
            email:''
        };
        
      }
      static navigationOptions = {
        headerShown:false
    }
    componentWillMount(){
     
      const user = firebase.auth().currentUser
      this.setState({email : user.email })
      
    }
    componentDidMount(){
      checkData()
    }

  

    render() {
      
    var {params} = this.props.navigation.state
    checkData=async()=>{
      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
     this.setState({
       iconname:'ios-checkmark-circle-outline'
     })
    }
    else{
      this.setState({
        iconname:'ios-add-circle-outline'
      })
    }
  });
    }
    

    buttonpressed=()=>{
      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).set({
          event_name : params.item.event_name,
          sport: params.item.sport,
          no_people : params.item.no_people,
          venue : params.item.venue,
          date: params.item.date,
          id: params.item.id
        
      })
      .catch(function(error) {
          console.log("error adding ", error);
      });
      checkData()
    }


    
    return (
      <Container >
        
        <Content>
          <Card style={{flex: 0}}>
            <CardItem style={{backgroundColor:'#4d4d4d'}}>
              <Left>
                <Image source={require("../assets/profile-pic.jpg")} style={{height:55,width:55,borderRadius:100}} />
                <Body>
                  <Text style={{fontSize:25}}>{params.item.event_name}</Text>
                  <Text note style={{fontSize:15}}>{params.item.date}</Text>
                </Body>
              </Left>
              <Right>
                  <Text note style={{fontSize:15}}>Creator</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Body style={{alignItems:'stretch'}}>
                <View>
                <Text style={{paddingBottom:2}}>
                    Sport: {params.item.sport}
                </Text> 
                <Text style={{paddingBottom:2}}>
                    Location: {params.item.venue}
                </Text>
                </View>
                <View style={{borderWidth:1,height:275}}>
                <Text style={{padding:20}}>
                  {params.item.moreDetail}
                </Text>
                </View>
              </Body>
            </CardItem>
            <CardItem style={{justifyContent: 'center',alignItems:'center'}}>
              <View>
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>buttonpressed()}>
                  <Icon name={this.state.iconname} style={{fontSize:55}}/>
                </Button>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}