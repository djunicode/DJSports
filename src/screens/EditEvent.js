import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput,ImageBackground, Dimensions} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import Dialog, { SlideAnimation, DialogContent , DialogButton, DialogFooter, DialogTitle} from 'react-native-popup-dialog';


const today = moment()
const right_now = today.format()

export default class EditEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            displayname: '',
            event_name : '',
            sport: '',
            no_people : '',
            venue : '',
            date: '',
            db: firebase.firestore(),
            id: 1,
            documentData: [],
            day: '',
            see: false,
            isVisible: false,
            visible: false
            

        }
    }

    componentDidMount() {
        const users = firebase.auth().currentUser
        this.setState({email : users.email })
        console.log("success yeah")
        console.log(users.email)
        const {state} = this.props.navigation;
        
        this.setState({
            event_name: state.params.event_name,
            no_people: state.params.no_people,
            sport: state.params.sport,
            date: state.params.date,
            venue: state.params.venue,
            day: state.params.day
        })
        
    }

    handleEdit = () => {
        
        if (this.check()) {
        console.log(this.state.event_name)
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.event_name).update({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id,
            day: this.state.day
        })
        .then(() => console.log("doc edited successfully"), 
        this.setState({id: this.state.id+1}) ,
        this.props.navigation.navigate('MyEvent'),
        this.state.db.collection('AllEvents').doc(this.state.event_name).update({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id, 
            day: this.state.day
        })
        )

        .catch(function(error) {
            console.log("error adding ", error);
        });
    }
    else {
        this.setState({ visible: true })
        console.log('not happeming')
    }
    }

    /*handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            date: moment(datetime).format('MMMM Do YYYY, h:mm A'),
            day: moment(datetime).format('YYYY-MM-DD'),

        },() => console.log("Date is ", this.state.date))
        
        //console.warn("A date has been picked: ", date);
    }*/

    handlePicker = (datetime) => {
          
        const rn = moment(right_now).format('YYYY-MM-DD')
        const data = moment(datetime).format('YYYY-MM-DD')
        console.log(rn)
        console.log(data)
        if(moment(rn).isSameOrAfter(data))
              this.setState({
                  see: true
              })
          else {
              this.setState({
                  isVisible: false,
                  date: moment(datetime).format('MMMM Do YYYY, h:mm A'),
                  day: moment(datetime).format('YYYY-MM-DD'),
                  //date_time : moment(datetime).format()
                  
              },() => console.log("Date is ", this.state.date))
          }
           
        
        //console.warn("A date has been picked: ", date);
    }

    hidePicker = (datetime) => {
      this.setState({
          isVisible: false,
          //date: moment(datetime).format(),
          
      },() => console.log("Date is ", this.state.date))
      
  }

  showPicker = () => {
      this.setState({
          isVisible: true,
      })
      console.log('hell now')
  }

 /* check = () => {
        
    if (this.state.event_name != '')
        this.setState({ check: true })
    else if (this.state.sport != '')
        this.setState({ check: true })
    else if (this.state.no_people != '')
        this.setState({ check: true })
    else if (this.state.venue != '')
        this.setState({ check: true })
    else if (this.state.date !== 'Select Date and Time')
        this.setState({ check: true })
    
    else
        this.setState({ check: false })



}*/

check() {
    console.log('name :' , this.state.event_name , `\n sport : ${this.state.sport} \n people : ${this.state.no_people} \n venue: ${this.state.venue} \n ${this.state.date} ` )
    if (this.state.event_name != '' && this.state.sport != '' && this.state.no_people != '' && this.state.venue != '' &&  this.state.date !== 'Select Date and Time' && parseInt(this.state.no_people) < 31)
      return true
    else
        return false   
}

   

    change = (event,num) => {
        
        return(
            <View style = {styles.container}>
                <ImageBackground
            source={require('../images/infobkg2.jpeg')}
            style = {{flex: 1,}}
            
        >
            <ScrollView style = {styles.container}>
               
                <View style = {{  marginHorizontal: 20,
        marginBottom: 30, paddingTop:20}}>
                    <Text style = {styles.inputTitle}>Event name</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="words" 
                    
                    value = {event}
                    onChangeText = {event_name => this.setState({event_name})}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Sport</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    onChangeText = {sport => this.setState({sport})}
                    value = {this.state.sport}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Number of players in team</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize="none" 
                    keyboardType = "number-pad"
                    onChangeText = {no_people => this.setState({no_people})}
                    value = {num}
                    >
                    </TextInput>
                </View>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Venue</Text>
                    <TextInput 
                    style = {styles.input}  
                    autoCapitalize= "sentences" 
                    multiline = {true}
                    numberOfLines = {3}
                    onChangeText = {venue => this.setState({venue})}
                    value = {this.state.venue}
                    >
                    </TextInput>
                </View>
                <Dialog
                    visible={this.state.see}
                   // dialogTitle = {<DialogTitle title="CAUTION"/>}
                    footer={
                        <DialogFooter>
                           <DialogButton
                            text="OK"
                            onPress={() => this.setState({see: false,isVisible: false})}
                          />
        
                        </DialogFooter>
                      }
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                >
                    <DialogContent>
                <Text style = {{padding: 20, paddingBottom:0, fontSize: 20}}>INVALID DATE</Text>
                    </DialogContent>
                </Dialog>
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Date</Text>
                    <TouchableOpacity onPress={this.showPicker} >
                    <Text style = {styles.input}>{this.state.date}</Text>
                    </TouchableOpacity>
                    <Dialog
                            visible={this.state.visible}
                            dialogTitle={<DialogTitle title="CAUTION" />}
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
                                <Text style={{ padding: 20, paddingBottom: 0, fontSize: 18 }}>Please fill up all the fields!</Text>
                            </DialogContent>
                        </Dialog>
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        mode='datetime'
                        display = {'spinner'}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                    />
                    
                    
                </View>
                
                <TouchableOpacity style = {styles.button } onPress = {this.handleEdit} >
                    <Text style = {{color: "white", fontFamily:'Roboto-Regular', fontSize: 20, fontWeight:'bold'}}>CHANGE</Text>

                </TouchableOpacity>
                
                
            </ScrollView>
            </ImageBackground>
            </View>

        )
    }

    render() {
        console.disableYellowBox = true
       const { state } = this.props.navigation;
        
        return(
            this.change(state.params.event_name,state.params.no_people)
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       //paddingTop: 15,
       //backgroundColor: 'black'
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 40,
        //marginTop: 20,
        fontWeight: 'bold'
    },
    inputForm: {
        marginHorizontal: 20,
        marginBottom: 30

    },

    inputTitle: {
        fontSize:18,
        color: "#ababab",
        fontFamily: 'Roboto-Light'
    },
    input: {
        fontSize: 18,
        borderBottomWidth: StyleSheet.hairlineWidth,
        //height: 5/100*Dimensions.get('window').height,
        color:'#fff',
        borderColor: '#424242',
        fontFamily: 'Roboto-Light'
    
    },
    button: {
       // marginHorizontal: 30,
        backgroundColor: "#00e676",
        borderRadius: 25,
        height: 5.5/100*Dimensions.get('window').height,
        justifyContent:"center",
        alignItems:"center",
        width: 45/100*Dimensions.get('window').width,//170,
        alignSelf:'center',
        marginTop: 15
        
    
    }


});