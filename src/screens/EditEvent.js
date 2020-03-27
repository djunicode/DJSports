import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';



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
        })
        
    }

    handleEdit = () => {
        console.log(this.state.event_name)
        this.state.db.collection('CreatedEvent').doc(this.state.email).collection('MyEvent').doc(this.state.event_name).update({
            event_name : this.state.event_name,
            sport: this.state.sport,
            no_people : this.state.no_people,
            venue : this.state.venue,
            date: this.state.date,
            id: this.state.id
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
            id: this.state.id
        })
        )

        .catch(function(error) {
            console.log("error adding ", error);
        });
    }

    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            date: moment(datetime).format('MMMM Do YYYY, h:mm A'),
            
        },() => console.log("Date is ", this.state.date))
        
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
  }

   

    change = (event) => {
        
        return(
            <View style = {styles.container}>
                 <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                        <Icon style = {{margin: 20, marginBottom: 0}}
                            name = "arrow-left"
                            size = {35}
                            color = "black"
                        />
                    </TouchableOpacity>
            <Text style = {styles.header}>{'Edit Event'}</Text>
            <ScrollView style = {styles.container}>
               
                <View style = {styles.inputForm}>
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
                    value = {this.state.no_people}
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
                <View style = {styles.inputForm}>
                    <Text style = {styles.inputTitle}>Date</Text>
                    <TouchableOpacity onPress={this.showPicker} >
                    <Text style = {styles.input}>{this.state.date}</Text>
                    </TouchableOpacity>
                    
                    <DateTimePicker
                        isVisible={this.state.isVisible}
                        mode='datetime'
                        display = {'spinner'}
                        onConfirm={this.handlePicker}
                        onCancel={this.hidePicker}
                    />
                    
                    
                </View>
                
                <TouchableOpacity style = {styles.button } onPress = {this.handleEdit} >
                    <Text style = {{color: "white"}}>CHANGE</Text>

                </TouchableOpacity>
                
                
            </ScrollView>
            </View>

        )
    }

    render() {
        console.disableYellowBox = true
       const { state } = this.props.navigation;
        
        return(
            this.change(state.params.event_name,state.params.date)
   
        );
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    header: {
        alignSelf: "center",
        fontSize: 40,
        fontStyle: "italic",
        //flexDirection: 'row',
        marginBottom: 40,
        marginTop: 20,
        fontWeight: 'bold'
    },
    inputForm: {
        marginHorizontal: 20,
        marginBottom: 30

    },

    inputTitle: {
        fontSize:18,
        color: "#8A8F9E"
    },
    input: {
        fontSize: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40
    
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "black",
        borderRadius: 8,
        height: 52,
        justifyContent:"center",
        alignItems:"center",
    
    }


});