import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert
} from "react-native";
import * as firebase from 'firebase/app'
import 'firebase/firestore'

class create_team extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            sports:'',
            details : '',
            teamName : '',
            db : firebase.firestore()
        }
    }

    name =(name)=>{
        this.setState({teamName: name})
    }
    sports = (sports)=> {
        this.setState({sports: sports})
    }
    details = (details)=> {
        this.setState({details: details})
    }
    handlePress = ()=> {
        const usersRef = this.state.db.collection('teams').doc(this.state.teamName)

    usersRef.get()
    .then((docSnapshot) => {
    if (docSnapshot.exists) {
    //   usersRef.onSnapshot((doc) => {
    //     // do stuff with the data
    //   });
      Alert.alert(
          'Team Name exists'
      )
    } else {
      usersRef.set({
        teamName : this.state.teamName,
        sports : this.state.sports,
        details : this.state.details 
      }).then(
        this.props.navigation.navigate('select_player',this.state.sports)
      ) // create the document
    }
});
        // this.state.db.collection('teams').doc(this.state.teamName).set({
        //     teamName : this.state.teamName,
        //     sports : this.state.sports,
        //     details : this.state.details 
        // })
        // .then(() => console.log("doc added successfully"), this.setState({id: this.state.id+1}) ,this.props.navigation.navigate('MyEvent',{user: 'simrn'}))
        // .catch(function(error) {
        //     console.log("error adding ", error);
        // });
       
        
    }

    
    render() {
        var {navigate} = this.props.navigation
        
        return (
            <ImageBackground source={require('../assets/media1.jpg')} style={{ height: '100%', width: '100%' }} >
            <ScrollView style={{ padding: 10 , marginTop:20 }}>
                <View style={style.container}>
                    <View style={{ flexDirection: 'row',  padding: 5,marginBottom:10 }}>
                        {/* <Icon name="user-circle" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 9,  }} /> */}
                        <TextInput
                            placeholder='Team Name'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.name}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>

                        {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='Sports'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.sports}>
                        </TextInput>
                    </View>
                    
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='A little something about your team'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.details}>
                        </TextInput>
                    </View>
                    
                    
                    
                    {/* {
                        this.state.textVisible ? <Text>Password did not match</Text> : null
                    } */}
                    <TouchableOpacity onPress ={this.handlePress} >
                        <View style={style.button1}>
                            <Text style={style.textbutton}>Add players</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </ImageBackground>
        );
    }
    // ()=>navigate('select_player',this.state.teamName)
}
export default create_team;

const style = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight:10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20
    },
    header: {
        paddingTop: 30,
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: "center",
        padding: 10,
        paddingBottom: 40
    },
    textbutton: {
        fontSize: 20,
        alignSelf: "center",
        color: 'white'
    },
    textInput: {
        height:50,
        width:'90%',
        justifyContent:'center',
        paddingLeft:10,
        color:'black',
        borderBottomColor:'black', 
        borderBottomWidth:1
    },
    button1: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 10,
    },
    button2: {
        backgroundColor: '#341f97',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10,
        marginBottom: 40
    },
    textInput1: {
        height:50,
        width:74,
        justifyContent:'center',
        paddingLeft:10,
        color:'black',
        borderBottomColor:'black', 
        borderBottomWidth:1
    },
})