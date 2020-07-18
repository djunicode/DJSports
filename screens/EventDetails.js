import React, { Component } from 'react';
import { Linking, Image, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconname: "ios-timer",
      db: firebase.firestore(),
      email: '',
      joined: 0,
      num: 0,
      limit_reached: false,
      registered: false,
      visible: false,
      data2: [],
      lat: 0,
      long: 0,
      location: ""
    };

  }
  static navigationOptions = {
    headerShown: false
  }
  componentWillMount() {

    const user = firebase.auth().currentUser
    this.setState({ email: user.email })

  }
  componentDidMount() {

    var { params } = this.props.navigation.state
    this.checkLimit()
    checkData()
    retData()
    /*var location
    fetch('https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=4&searchtext=' + params.item.venue + '&apiKey=l9zrSly8XJoP7gQ7M5hCxRe_-g6f-yfr41tgSF2N7Yc')
      .then((response) => response.json())
      .then((json) => {
        console.log("test")
        location = json.Response.View[0].Result[0].Location.DisplayPosition
        this.setState({
          lat: json.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
          long: json.Response.View[0].Result[0].Location.DisplayPosition.Longitude
        })
        console.log(this.state.lat)
        console.log(this.state.long)


      })
      .catch((error) => {
        console.error(error);
      })*/
  }

  checkLimit = () => {
    var { params } = this.props.navigation.state
    let number = parseInt(params.item.no_people)
    this.setState(
      { num: number }
    )
    if (params.item.joined == number)
      this.setState({ limit_reached: true })
  }




  render() {

    var { params } = this.props.navigation.state

    checkData = async () => {


      this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            this.setState({
              iconname: 'check-circle',
              registered: true,

            })
          }
          else {
            this.setState({
              iconname: 'plus-circle'
            })
          }
        });
    }

    retData = async () => {
      let documentData = []
      var docRef = this.state.db.collection("AllEvents").doc(params.item.event_name);

      await docRef.get().then(function (doc) {
        documentData = doc.data()
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
      this.setState({ data2: documentData })
      console.log('data 2 is', this.state.data2.player)
    }


    buttonpressed = () => {
      try{
        let player = this.state.data2.players
      let creator = this.state.data2.created_by
      console.log(player)
      player.push(this.state.email)
      // console.log(params.item.joined+1)
      let count = params.item.joined + 1

      if (!this.state.registered) {

        this.state.db.collection('AllEvents').doc(params.item.event_name).update({
          joined: count,
          players: player

        })
        this.state.db.collection('CreatedEvent').doc(creator).collection('MyEvent').doc(params.item.event_name).update({
          players: player
        })
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).set({
          event_name: params.item.event_name,
          sport: params.item.sport,
          no_people: params.item.no_people,
          venue: params.item.venue,
          date: params.item.date,
          id: params.item.id,
          keywords: params.item.keywords,
          created_by: params.item.created_by
        })
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(params.item.event_name).update({
          joined: count,
        })
          .catch(function (error) {
            console.log("error adding ", error);
          });
      }
      else {
        console.log('already registered')
        this.setState({ visible: true })
      }



      checkData()

      }
      catch(error) {
        console.log( 'join error is ', error)
      }

    }



    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/infobkg2.jpeg')}
          style={{ flex: 1, }}

        >


          <Text style={styles.headerText}>{params.item.event_name}</Text>


          <View style={styles.shadow}>
            <Icon name="soccer-ball-o" size={25} style={styles.icon} />
            <Text style={styles.info}>{params.item.sport}</Text>
          </View>

          <View style={styles.shadow} >

            <Icon name="users" style={styles.icon} size={25} />
            <Text style={styles.info}>{params.item.no_people}</Text>

          </View>

          <View style={styles.shadow}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon name="map-marker" style={styles.icon} size={25} />
              <Text style={styles.info}>{params.item.venue}</Text>

            </View>
          </View>
          

          <View style={styles.shadow}>
            <Icon name="calendar" style={styles.icon} size={25} />
            <Text style={styles.info}>{params.item.date}</Text>
          </View>
          <View style = {{flex:1, alignContent:'center', justifyContent:'center', flexDirection:'row', marginTop:50}}>
            {(!this.state.limit_reached) ?
              <Button transparent textStyle={{ color: '#fff' }} onPress={() => buttonpressed()}>
                <Icon name={this.state.iconname} style={{ fontSize: 45 }} color='#b9f6ca' />
              </Button> :
              <View>
                <Text style={{ color: '#b9f6ca', fontSize: 20 }}>Sorry. Registrations full</Text>
              </View>}
          </View>

          <Dialog
            visible={this.state.visible}

            footer={
              <DialogFooter>

                <DialogButton
                  text="OK"
                  onPress={() => this.setState({ visible: false })}
                />
              </DialogFooter>
            }
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>You have already registered!</Text>
            </DialogContent>
          </Dialog>


        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#'
    //alignItems: 'center',
    //justifyContent: 'space-around',

  },
  headerText: {
    alignSelf: 'center',
    fontSize: 45,
    //fontStyle: 'italic',
    padding: 15,
    //fontWeight: 'bold',
    color: '#fafafa',
    elevation: 20,
    fontFamily: 'FiraSansCondensed-Regular'

  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    //paddingTop: 15
    //borderBottomWidth: 1,
    //borderBottomColor: "black",


  },
  title: {
    fontSize: 30,
    //marginLeft: 10,
    fontWeight: 'bold',
    padding: 5,
    color: '#ababab'

  },
  info: {
    fontSize: 25,
    //marginLeft: 10,
    padding: 10,
    paddingBottom: 1,
    color: '#e0e0e0',
    fontFamily: 'Roboto-Light'



  },
  shadow: {
    // borderColor:'black', // if you need 
    // borderWidth:2.5,
    //elevation: 20,
    //shadowColor: 'red',
    borderRadius: 8,
    //alignItems: 'center',
    //alignSelf: 'stretch',
    //justifyContent: 'center',
    //borderBottomColor: '#3f51b5',
    //borderTopColor: '#3f51b5',
    //backgroundColor: '#84ffff',
    marginHorizontal: 10,
    //borderRightColor:'#3f51b5',
    marginVertical: 10,
    flexDirection: 'row',
    //padding:10


  },
  icon: {
    color: 'white',
    padding: 12
  }
})

/*
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

            </CardItem>
          </Card>

        </Content>
      </Container>


      <TouchableOpacity onPress={() => Linking.openURL('http://www.google.com/maps/place/' + this.state.lat + ',' + this.state.long)}>
            <View style={{ flexDirection: 'row', marginLeft: 40, paddingBottom: 20 }}>
              <Icon name="location-arrow" style={{ color: '#ababab', }} size={15} />
              <Text style={{ color: '#ababab', }}>
                {"  Directions"}
              </Text>
            </View>
          </TouchableOpacity>
      */