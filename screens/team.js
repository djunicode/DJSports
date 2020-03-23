import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class team extends Component {
    
    render() {
        var {params} = this.props.navigation.state
        console.log({params})
        return (
            <View style={styles.container}>
                
                <Text>{params.item.teamName}</Text>
                <Text>{params.item.teamDetail}</Text>
                <Text>{params.item.moreDetail}</Text>
            </View>
        );
    }
}
export default team;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});