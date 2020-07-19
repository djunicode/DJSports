import React, { Component } from 'react';
import { Alert,Image,View ,StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
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
            visible_remove: false,
            isFavorite : false,
            update : "",
            isInvited:false,
            visible_invite: false
        };
        
      }

      static navigationOptions = {
        headerShown:false
    }
    componentDidMount(){
     
      const user = firebase.auth().currentUser
      const doc = this.state.db.collection("Users").doc(user.email)
      var {params} = this.props.navigation.state
      this.retData(params, user.email)
      var t 
      let id = user.email
      this.state.db.collection('CreatedEvent').doc(params.item.email).collection('MyEvent').doc(params.data2.event_name).get()
      .then((docSnapshot)=>{
        if(docSnapshot.exists){
          this.setState({isInvited:true})
      }
      })
      this.state.db.collection('Invites').doc(params.item.email).collection('InviteFrom').doc(id).get()
        .then((docSnapshot)=>{
          if(docSnapshot.exists){
          
          console.log(docSnapshot.data().EventName.includes(params.data2.event_name))
          if(docSnapshot.data().EventName.includes(params.data2.event_name)){
            this.setState({isInvited:true})
          }
        }
        })
  
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

    addFav=()=>{
      var {params} = this.props.navigation.state
      console.log('sports are',params.item.sports)
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

       remFav=()=>{
        this.setState({
          visible_remove: false
        })
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
       askToRemove=()=>
       {
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

       askToInvite=()=>{
        this.setState({
          visible_invite: true
        })
      }
    
      invite = () => {
        this.setState({
          visible_invite:false
        })
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
              id: user.email
            })
          }
        }
        this.setState({
          isInvited:true
        })
        
      }
    
   
    


  

    render() {
      
    var {params} = this.props.navigation.state
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
                  Plays:  {'\n'}<Text style={{ fontWeight: "100",  fontSize: 25, margin: 5 }}>{params.item.sports.map((item1, key) => (
                  <Text style={{ color: 'white',  fontSize: 20, margin: 5, padding:5 }} key={key} >{item1}, </Text>)
                )}</Text>
                </Text>
              </View>
            </View>
      
            <View>
            <TouchableOpacity style={{ margin: 10, backgroundColor: '#00e676', padding: 8, width: 250, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} 
             onPress= {this.askToRemove}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#fff" }}>
                    Remove from Favourites
                </Text>
            </View>
        </TouchableOpacity>
        { !this.state.isInvited ?
     <TouchableOpacity style={{ margin: 10, backgroundColor: '#D3D3D3', padding: 8, width: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} 
     onPress= {this.askToInvite}>
          <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20, }}>
                  Invite to Event
              </Text>
          </View>
      </TouchableOpacity>
      :
      <View style={{ margin: 10, backgroundColor: '#D3D3D3', padding: 8, width: 240, justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginLeft: 5 }} >
          <View>
              <Text style={{ fontWeight: 'bold', fontSize: 20, }}>
                  Already Invited or joined
              </Text>
          </View>
      </View>
     
      
    }

      </View>


    
 

       


          </View>
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
          <Dialog
            visible={this.state.visible_invite}

            footer={
              <DialogFooter>

                <DialogButton
                  text="OK"
                  onPress={() => this.invite()}
                />
                <DialogButton
                  text="Cancel"
                  onPress={() => this.setState({ visible_invite: false })}
                />
              </DialogFooter>
            }
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
          >
            <DialogContent>
              <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Invite this person</Text>
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
    fontSize: 25,
    fontFamily: 'FiraSansCondensed-Regular',
    color: '#b9f6ca',
    
  },
  text3: {
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    textTransform: 'uppercase',
    color: '#ababab'
  }
});

/*
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
            </Text> }
            <TouchableOpacity onPress ={this.askToRemove}>
              <View>
                <Text>Remove From favorites</Text>
              </View>
            </TouchableOpacity>
            </View>
            
        
    
          </Card>
         
        </Content>
      </Container>*/