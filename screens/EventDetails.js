import React, { Component } from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';

export default class EventDetails extends Component {
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
            data2:[]
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
      this.checkLimit()
      checkData()
      retData()
    }

    checkLimit = () => {
      var {params} = this.props.navigation.state
      let number = parseInt(params.item.no_people)
      this.setState({num: number})
      if(params.item.joined == number)
        this.setState({limit_reached: true})
    }


  

    render() {
      
    var {params} = this.props.navigation.state
    
    checkData=async()=>{
      
      
      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
     this.setState({
       iconname:'ios-checkmark-circle-outline',
       registered: true,

     })
    }
    else{
      this.setState({
        iconname:'ios-add-circle-outline'
      })
    }
  });
    }
    
    retData=async()=>{
      let documentData=[]
      var docRef = this.state.db.collection("AllEvents").doc(params.item.event_name);

        await docRef.get().then(function(doc) {
           documentData=doc.data()
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
       this.setState({data2:documentData})
        console.log('data 2 is',this.state.data2.player)
            }
    

    buttonpressed=()=>{
      let player=this.state.data2.players
      let creator=this.state.data2.created_by
      console.log(player)
      player.push(this.state.email)
      // console.log(params.item.joined+1)
      let count = params.item.joined+1

      if(!this.state.registered) {
      
      this.state.db.collection('AllEvents').doc(params.item.event_name).update({
        joined: count,
        players:player
      
    })
    this.state.db.collection('CreatedEvent').doc(creator).collection('MyEvent').doc(params.item.event_name).update({
      players:player
      })
      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).set({
          event_name : params.item.event_name,
          sport: params.item.sport,
          no_people : params.item.no_people,
          venue : params.item.venue,
          date: params.item.date,
          id: params.item.id,
          keywords:params.item.keywords,
          created_by:params.item.created_by
      })
      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).update({
        joined:count,
      })
      .catch(function(error) {
          console.log("error adding ", error);
      });
    }
    else {
      console.log('already registered')
      this.setState({visible:true})
    }



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
                {(!this.state.limit_reached)?
                <Button transparent textStyle={{color: '#87838B'}} onPress={()=>buttonpressed()}>
                  <Icon name={this.state.iconname} style={{fontSize:55}}/>
                </Button>:
                <View>
                  <Text style = {{color: 'red'}}>Sorry. Registrations full</Text>  
                </View>}
              </View>
            </CardItem>
          </Card>
          <Dialog
                    visible={this.state.visible}
                    
                    footer={
                        <DialogFooter>
                          
                          <DialogButton
                            text="OK"
                            onPress={() => this.setState({visible: false})}
                          />
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                        <Text style = {{padding: 20, paddingBottom:0, fontSize: 18}}>You have already registered!</Text>
                    </DialogContent>
                </Dialog>
        </Content>
      </Container>
    );
  }
}