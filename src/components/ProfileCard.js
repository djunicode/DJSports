import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,StatusBar,StatusBarStyle
} from "react-native";
import 'firebase/firestore'
class ProfileCard extends Component {
   
   
    render() {
        console.disableYellowBox = true
        return (
            <View style = {{flex:1 , backgroundColor:'#000' }}>
                <StatusBar barStyle={StatusBarStyle} backgroundColor="#111111" />
                <View style={{flexDirection:'row' , margin:20 , marginTop:20 , marginBottom:10, borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor:'#424242'}}>
                    <Image 
                        source = {this.props.image}
                        style = {{ height:80, width:80 , borderRadius:40}}
                    />
                    <View style ={{margin:15 , marginTop:0 }}>
                        <View style = {{flexDirection: 'column'}}>
                        <Text style={{fontWeight:'bold', fontSize:17 , color:'#fff'}}>
                            {this.props.Name}
                        </Text>
                        <Text style = {{fontSize:14 , color:'#fff', fontFamily: 'SpaceMono-Regular', textTransform: 'uppercase', padding:3}}>
                            {this.props.Branch} {this.props.Year}
                        </Text>
                        <View style = {{flexDirection: 'row', padding: 2}}>
                            <Text style = {{color: '#ababab'}}>{this.props.Sports[0]}</Text>
                            <Text style = {{color: '#ababab'}}>   {this.props.Sports[1]}</Text>
                            <Text style = {{color: '#ababab'}}>   {this.props.Sports[2]}</Text>
                        </View>
                        </View>
                        <View style ={{margin:10 , backgroundColor:'#00e676' , padding:8 ,width:180, justifyContent:'center',alignItems:'center' , borderRadius:10 , marginLeft:5}}>
                            {
                               (this.props.Fav)?
                               
                                

                                <Text  style={{fontWeight:'bold', fontSize:17 ,color : "#fff"}}>
                                    Already in your Favs
                                </Text>
                            
                            :
                           

                                <Text  style={{fontWeight:'bold', fontSize:17 ,color : "#fff"}}>
                                    View Details
                                </Text>
                            
                                
                            }
                            
                        </View>
                  
                    </View>
                    
                    
                    
                </View>
            </View>
            )
    }
}
export default ProfileCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
});
