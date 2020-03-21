import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class notifs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>notifs</Text>
            </View>
        );
    }
}
export default notifs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});