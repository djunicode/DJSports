import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,TextInput,

} from "react-native";

class join_team extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Join teams comes here 
                    
                </Text>
            </View>
        );
    }
}
export default join_team;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});