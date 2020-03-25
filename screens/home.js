import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>home</Text>
            </View>
        );
    }
}
export default home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});