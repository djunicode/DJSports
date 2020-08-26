import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView, Image, ScrollView } from "react-native";
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'firebase';
import '@firebase/firestore'
import 'firebase/storage'
import { concat } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';

//import StarRating from 'react-native-star-rating';
var username = 'Simrn'
// var name1 
//The above data comes from Authentication
class profile extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            username: '',
            name: '',
            department: '',
            address: '',
            ratings: '',
            sports: '',
            team: '',
            year: '',
            wins: '',
            filePath: {},
            fileData: '',
            fileUri: '',
            email:'',
            refresh : true,
        };

    }

    onFocusFunction = (email) => {
        console.log('ehehhe ', email)
        this.retrieveData(email)
        console.log("i am on profile")
        //const user = firebase.auth().currentUser
        //console.log('user : ' , user)
        //console.log(today.format('MMMM Do YYYY, h:mm A'))

    }

    componentDidMount() {
        const user = firebase.auth().currentUser
        this.setState({email:user.email})
        //console.log('user : ' , user)
        /*const ref = firebase.firestore().collection('Users').doc('Simrn');
        firebase.firestore()
            .runTransaction(async (transaction) => {
                const snapshot = await transaction.get(ref);
                console.log(snapshot.docs.map(doc => doc.data()))
                this.state.name1 = snapshot.data().name
                console.log(this.state.name1)
                console.log(snapshot.data())
                console.log(snapshot.data().name)
                this.setState({ name: snapshot.data().name });
                this.setState({ department: snapshot.data().department });
                this.setState({ team: snapshot.data().team });
                this.setState({ address: snapshot.data().address });
                this.setState({ ratings: snapshot.data().ratings });
                this.setState({ sports: snapshot.data().sports });
                this.setState({ year: snapshot.data().year });
                this.setState({ wins: snapshot.data().wins });
            });*/
        //console.log(user.email)
        this.retrieveData(user.email)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction(user.email)
        })

    }

    retrieveData = async (email) => {
        try {
            console.log('fetching user details')
            await firebase.firestore().collection("Users").doc(email)
                .onSnapshot(documentSnapshot => {
                    console.log('User data: ', documentSnapshot.data());

                    let data = documentSnapshot.data()
                    this.setState({
                        name: data.name,
                        sports: data.sports,
                        year: data.year,
                        address: data.address,
                        department: data.branch,
                        image:data.image,

                    })

                });


        }
        catch (error) {
            console.log(error)
        }
    }


    chooseImage = () => {
        let options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            cropping:true,
            width:500,
            height:500,	
        };
        ImagePicker.openPicker(options).then((response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // alert(JSON.stringify(response));s
                // console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.path
                });
                const blob = this.uriToBlob(response.path)
                console.log(`blob create ${blob}`)
                const img = this.uploadPhotoAsync(response.path)
                // const img = this.uploadToFirebase(blob)
                console.log('image uploaded...' + JSON.stringify(img))
            }
        });
    }
    renderFileData = () => {
        if (this.state.image) {
            return <Image source={{ uri: this.state.image }}
                style={styles.profileImage}
            />
        } else {
            return <Image source={require('../assets/profile-pic.jpg')}
                style={styles.profileImage}
            />
        }
    }
    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

    }


    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob()

            let upload = firebase
                .storage()
                .ref('profile/'+this.state.email)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => { },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                    console.log(url)
                    firebase.firestore().collection("Users").doc(this.state.email).update({
                        image:url
                    })
                    this.setState({
                        refresh:true
                    })
                }
            );
        });
    };


    uploadToFirebase = (blob) => {

        return new Promise((resolve, reject) => {

            var storageRef = firebase.storage().ref();

            storageRef.child('uploads/photo.jpg').put(blob, {
                contentType: 'image/jpeg'
            }).then((snapshot) => {

                blob.close();

                resolve(snapshot);

            }).catch((error) => {

                reject(error);

            });

        });


    }
    signout = () => {
        firebase.auth().signOut()
        this.props.navigation.navigate('LoginScreen')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
                    <View style={styles.titleBar}>
                        
                        {/* <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons> */}
                        {/* <Ionicons name="md-more" size={24} color="#52575D"></Ionicons> */}
                    </View>

                    <View style={{ alignSelf: "center", }}>
                        <TouchableOpacity style={styles.profileImage}
                            onPress={() => this.chooseImage()}>
                            {this.renderFileData()}
                        </TouchableOpacity>
                        <View style={styles.dm}>
                            {/* <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons> */}
                        </View>
                        <View style={styles.active}>

                        </View>
                        <View style={styles.add}>
                            {/* <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons> */}
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{this.state.name}</Text>
                        <Text style={[styles.text3, { color: "#ababab", fontSize: 14 }]}>{this.state.year} {this.state.department}</Text>
                    </View>

                    
                    
                    
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 , paddinTop: 20}}>
                                <Text style={styles.text2}>
                                    Favorite sports : <Text style={{ fontWeight: "bold" }}>{this.state.sports[0]}</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                <Text style={styles.text2}>
                                    Also Plays : <Text style={{ fontWeight: 'bold' }}>{this.state.sports[1]}, </Text>
                                    <Text style={{ fontWeight: 'bold' }}>{this.state.sports[2]}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style = {styles.button}
                        onPress={() => this.signout()} >
                            <Icon style={{alignSelf: 'flex-end',}}
                        name = "sign-out"
                        size = {20}
                        color = "#ababab"
                    />
                            <Text style = {{color: '#ababab', textAlign:'center'}}> SIGN OUT</Text>
                        </TouchableOpacity>
                {/*</ScrollView>*/}
            </SafeAreaView>
        );
    }
}
export default profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    text: {
        fontFamily: "Roboto-Regular",
        color: "#fff",
        fontSize: 20
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 25,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
        paddingTop: 20
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    button: {
        borderRadius: 10,
        //width: 100,
       // backgroundColor: 'red',
      //marginTop:290,
      right: 20,
      bottom:20,
      position: 'absolute',
      flexDirection: 'row'

    
    },
    text2: {
        fontSize: 22,
        fontFamily: 'FiraSansCondensed-Regular',
        color: 'white'
    },
    text3: {
        fontSize:16,
        fontFamily: 'SpaceMono-Regular',
        textTransform: 'uppercase',
        color: '#ababab'
    }
});


/*<View style={styles.statsContainer}>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>{this.state.team}</Text>
                            <Text style={[styles.text, styles.subText]}>Teams</Text>
                        </View>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[styles.text, { fontSize: 24 }]}>{this.state.ratings}

                                {/* <StarRating
        disabled={false}
        maxStars={1}
        rating={this.state.ratings}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
      /> }

                            </Text>
                            <Text style={[styles.text, styles.subText]}>Ratings </Text>
                        </View>
                        <View style={styles.statsBox}>
                            <Text style={[styles.text, { fontSize: 24 }]}>{this.state.wins}</Text>
                            <Text style={[styles.text, styles.subText]}>Wins</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("../assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                            <View style={styles.mediaImageContainer}>
                                <Image source={require("../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                            </View>
                        </ScrollView>
                        {/* <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View> }
                        {/* {In case you need the media count} }
                        </View>
                        {<Text style={styles.subText}>Player Details</Text>}
*/