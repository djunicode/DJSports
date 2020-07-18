import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { Container, Content, Card, CardItem, Text, Left, Body, Right } from 'native-base';
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Dialog, { SlideAnimation, DialogContent, DialogButton, DialogFooter, DialogTitle } from 'react-native-popup-dialog';

export default class ProfileDetails extends Component {

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
      visible_remove: false,
      isFavorite: false
    };

  }

  static navigationOptions = {
    headerShown: false
  }
  componentDidMount() {

    const user = firebase.auth().currentUser
    const doc = this.state.db.collection("Users").doc(user.email)
    var { params } = this.props.navigation.state
    this.retData(params, user.email)
    var t

    firebase
      .firestore()
      .collection("Users").doc(user.email)
      .get()
      .then((querySnapshot) => {
        console.log("out snap") //Notice the arrow funtion which bind `this` automatically.

        console.log("In snap")
        var favs = []
        var t;
        favs = querySnapshot.get("favorites")
        console.log(favs)
        t = favs.includes(params.item.email)
        console.log(t)
        console.log(typeof (t))
        console.log("name " + params.item.name)
        console.log(t)
        this.setState({ isFavorite: t });   //set data in state here

        console.log(this.state.isFavorite)
        console.log(user.email)

      });

  }
  retData = async (params, id) => {
    var docRef = this.state.db.collection("Invites").doc(params.item.email).collection('InviteFrom').doc(id);

    await docRef.get().then((doc) => {
      this.setState({
        data2: doc.data()
      })
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });


  }
  addFav = () => {
    this.setState({
      visible: false
    })
    var { params } = this.props.navigation.state
    const user = firebase.auth().currentUser
    let id = user.email

    const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
    const doc = this.state.db.collection("Users").doc(id)
    doc.update({
      favorites: arrayUnion(params.item.email)
    });
    this.setState(
      {
        isFavorite: true
      }
    )

  }

  remFav = () => {
    this.setState({
      visible_remove: false
    })
    var { params } = this.props.navigation.state
    const user = firebase.auth().currentUser
    let id = user.email

    const arrayRemove = firebase.firestore.FieldValue.arrayRemove;
    const doc = this.state.db.collection("Users").doc(id)
    doc.update({
      favorites: arrayRemove(params.item.email)
    });
    this.setState({
      isFavorite: false
    })





  }
  askToRemove = () => {
    this.setState({
      visible_remove: true
    })
    /*Alert.alert(
      'Remove from Favorites?',
      '',
      [
        {
          text: 'Yes',
          onPress: this.remFav
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
      ],
      { cancelable: true }
    );*/
  }
  askToAdd = () => {
    this.setState({
      visible: true
    })
   /* Alert.alert(
      'Add to Favorites?',
      '',
      [
        {
          text: 'Yes',
          onPress: this.addFav
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        // { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: true }
    );*/
  }
  invite = () => {
    var { params } = this.props.navigation.state
    //console.log(params.data2)
    //console.log(this.state.data2)
    const user = firebase.auth().currentUser
    let id = user.email
    let data = this.state.data2
    console.log(data)


    let data2 = []

    if (data == undefined) {
      data2.push(params.data2.event_name)
      this.state.db.collection('Invites').doc(params.item.email).collection('InviteFrom').doc(id).set({
        EventName: data2,
        name: params.item.name,
        id: user.email
      })
    }
    else {
      if (!data.EventName.includes(params.data2.event_name)) {

        data.EventName.push(params.data2.event_name)
        this.state.db.collection('Invites').doc(params.item.email).collection('InviteFrom').doc(id).set({
          EventName: data.EventName,
          name: params.item.name,
          Id: user.email
        })
      }
    }
  }







  render() {

    var { params } = this.props.navigation.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
            {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons> */}
            {/* <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
          </View>

          <View style={{ alignSelf: "center", }}>
            <Image source={require("../assets/media2.jpg")} style={styles.profileImage} />
            <View style={styles.dm}>
              {/* <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons> */}
            </View>
            <View style={styles.active}>

            </View>
            <View style={styles.add}>
              {/* <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons> */}
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{params.item.name}</Text>
            <Text style={[styles.text3, { color: "#ababab", fontSize: 14 }]}>{params.item.year} {params.item.branch}</Text>
          </View>




          <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250, paddinTop: 20 }}>
                <Text style={styles.text2}>
                  Plays:   <Text style={{ fontWeight: "100", fontFamily: 'Roboto-Light', fontSize: 40, margin: 5 }}>{params.item.sports.map((item1, key) => (
                  <Text style={{ color: 'white', fontFamily: 'Roboto-Light', fontSize: 29, margin: 5 }} key={key} >{item1},{'\n'} </Text>)
                )}</Text>
                </Text>
              </View>
            </View>
            {  this.state.isFavorite ?
            <View>
            <Text>
              {params.item.name} is in your favorites!
            </Text>
            <TouchableOpacity style={{ margin: 10, backgroundColor: '#00e676', padding: 8, width: 250, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} 
             onPress = {this.askToRemove}
            >
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#fff" }}>Remove From Favourites</Text>
              </View>
            </TouchableOpacity>
            </View>
            :
            <View>
            <TouchableOpacity style={{ margin: 10, backgroundColor: '#00e676', padding: 8, width: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} 
             onPress= {this.askToAdd}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#fff" }}>
                    Add to Favourites
                </Text>
            </View>
        </TouchableOpacity>

      </View>


    }
    <TouchableOpacity style={{ margin: 10, backgroundColor: '#D3D3D3', padding: 8, width: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} 
     onPress= {this.invite}>
          <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20, }}>
                  Invite to Event
              </Text>
          </View>
      </TouchableOpacity>

       


          </View>
          <Dialog
            visible={this.state.visible}

            footer={
              <DialogFooter>

                <DialogButton
                  text="OK"
                  onPress={() => this.addFav()}
                />
                <DialogButton
                  text="Cancel"
                  onPress={() => this.setState({ visible: false })}
                />
              </DialogFooter>
            }
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Add to Favourites ?</Text>
            </DialogContent>
          </Dialog>
          <Dialog
            visible={this.state.visible_remove}

            footer={
              <DialogFooter>

                <DialogButton
                  text="OK"
                  onPress={() => this.remFav()}
                />
                <DialogButton
                  text="Cancel"
                  onPress={() => this.setState({ visible_remove: false })}
                />
              </DialogFooter>
            }
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Remove from Favourites ?</Text>
            </DialogContent>
          </Dialog>



        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  text: {
    fontFamily: "Roboto-Regular",
    color: "#fff",
    fontSize: 20
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  subText: {
    fontSize: 25,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statsBox: {
    alignItems: "center",
    flex: 1
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingTop: 20
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 13,
    marginRight: 20
  },
  button: {
    borderRadius: 10,
    //width: 100,
    // backgroundColor: 'red',
    marginTop: 290,
    marginLeft: 280,
    flexDirection: 'row'


  },
  text2: {
    fontSize: 29,
    fontFamily: 'FiraSansCondensed-Regular',
    color: 'white'
  },
  text3: {
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    textTransform: 'uppercase',
    color: '#ababab'
  }
});


/*<Container >

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
            {  this.state.isFavorite ?
            <View>
            <Text>
              {params.item.name} is in your favorites!
            </Text>
            <TouchableOpacity onPress = {this.askToRemove}
            >
              <View>
                <Text>Remove From favorites</Text>
              </View>
            </TouchableOpacity>
            </View>
            :
            <View>
            <TouchableOpacity onPress= {this.askToAdd}>
            <View>
                <Text>
                    Add to Favorite
                </Text>
            </View>
        </TouchableOpacity>

      </View>


    }
    <TouchableOpacity onPress= {this.invite}>
          <View>
              <Text>
                  invite
              </Text>
          </View>
      </TouchableOpacity>
          </Card>

        </Content>
      </Container>
      */