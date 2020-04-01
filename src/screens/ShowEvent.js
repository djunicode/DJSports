import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, ScrollView, TextInput, ImageBackground} from 'react-native'
import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ShowEvent extends React.Component {
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
        const {state} = this.props.navigation;
        
        this.setState({
            event_name: state.params.event_name,
            no_people: state.params.no_people,
            sport: state.params.sport,
            date: state.params.date,
            venue: state.params.venue,
        })
    }

    render() {
        console.disableYellowBox = true
        return(
            <View style = {styles.container}>
                <ImageBackground
            
            source = {{uri: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}}
            style = {{flex: 1}}
            
        >
            <View style = {{ height: 55, width: 80, marginBottom:0,alignSelf:'flex-start'}}>
            <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                        <Icon style = {{margin: 20, marginBottom: 0}}
                            name = "arrow-left"
                            size = {35}
                            color = "#84ffff"
                        />
                    </TouchableOpacity>
                    </View>
                <View style = {styles.header }>
                    
                <Text style = {styles.headerText}>{this.state.event_name.toUpperCase()}</Text>
                </View>
                
                <View style = {styles.shadow}>
                <Text style = {styles.title}>Sport</Text>
                <Text style = {styles.info}>{this.state.sport}</Text>
                </View>
                
                <View style = {styles.shadow}>
                <Text style = {styles.title}>Number of players</Text>
                <Text style = {styles.info}>{this.state.no_people}</Text>
                </View>
                <View style = {styles.shadow}>
                <Text style = {styles.title}>Venue</Text>
                <Text style = {styles.info}>{this.state.venue}</Text>
                </View>
                <View style = {styles.shadow}>
                <Text style = {styles.title}>Date and time</Text>
                <Text style = {styles.info}>{this.state.date}</Text>
                </View>
                

            </ImageBackground>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#18ffff'
        //alignItems: 'center',
        //justifyContent: 'space-around',
        
    },
    headerText: {
        //alignSelf: 'flex-start',
        fontSize: 60,
        fontStyle: 'italic',
       paddingLeft:15,
        fontWeight: 'bold',
        color: '#fafafa',
        elevation: 20
        
    },
    header : {
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
        color: '#1a237e'

    },
    info: {
        fontSize : 25,
        //marginLeft: 10,
        padding:10,
        paddingBottom: 15,
        color: '#0d47a1'
        


    },
    shadow: {  
        borderColor:'black', // if you need 
        borderWidth:2.5,
        elevation: 20,
        shadowColor: 'red',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderBottomColor: '#3f51b5',
        borderTopColor: '#3f51b5',
        backgroundColor: '#84ffff',
        marginHorizontal: 10,
        borderRightColor:'#3f51b5',
        marginVertical: 10
        
        
    }
})