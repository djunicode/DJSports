import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    ScrollView,
    TouchableOpacity
} from "react-native";

class create_team extends Component {
    render() {
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
                            onChangeText={this.Username}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>

                        {/* <Icon name="address-book" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='Sports'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.address}>
                        </TextInput>
                    </View>
                    
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='A little something about your team'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.sports1}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='Sports2'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.sports2}>
                        </TextInput>
                        </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="futbol-o" size={25} color="black" style={{ paddingTop: 10, paddingLeft: 10,}} /> */}
                        <TextInput
                            placeholder='Sports3'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.sports3}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="user" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} /> */}
                        <TextInput
                            placeholder='LoginId'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.LoginId}
                            keyboardType='email-address'>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>
                        {/* <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} /> */}
                        <TextInput
                            secureTextEntry={true}
                            placeholder='Enter Password'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.Password}>
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 5, marginBottom:10 }}>

                        {/* <Icon name="lock" size={30} color="black" style={{ paddingTop: 10, paddingLeft: 12,}} /> */}
                        <TextInput
                            secureTextEntry={true}
                            placeholder='Re Enter your Password'
                            placeholderTextColor='black'
                            style={style.textInput}
                            onChangeText={this.RePassword}>
                        </TextInput>
                    </View>
                    {/* {
                        this.state.textVisible ? <Text>Password did not match</Text> : null
                    } */}
                    <TouchableOpacity  >
                        <View style={style.button1}>
                            <Text style={style.textbutton}>Create Team</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </ScrollView>
        </ImageBackground>
        );
    }
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