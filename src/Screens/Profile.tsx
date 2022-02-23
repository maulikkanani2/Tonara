import React, { useEffect, useState, FC } from 'react'
import { View, Text, Image, SafeAreaView, TextInput, StyleSheet, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { TEXT } from '../Component/TEXT'
import MyState from "../Component/interfaces"
import { Colors } from '../../Utility/Color'

const Profile = () => {
    const navigation = useNavigation();
    const [show, setShow] = useState(false)
    const [data, setData] = useState<MyState[] | null>(null)
    const [loader, setLoader] = useState(false)
    const [serchdata, setSearchdata] = useState("")
    const [showsearch, setShowsearch] = useState<boolean>(false)

    //Searching profile function 
    const handleSearch = (queryText) => {
        {
            data.map((item, i) => {
                setSearchdata(item.title)
            })
        }
        setShowsearch(true)
        let filteredData: MyState[] = data.filter(function (item) {
            const itemdata = `${item.title.toUpperCase()}`;
            const itemtext = queryText.toUpperCase();
            return itemdata.includes(itemtext);
        });

        if (filteredData == null) {
            setShowsearch(false)

        } else {

        }
        setSearchdata(filteredData);

        if (filteredData.length == 0) {
            setShowsearch(false)

        }

        if (queryText.length == 0) {
            setShowsearch(false)
        }

    }
    // Reload page after navigation
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getdata()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    //Card component
    const RenderItem: FC = ({ item }) => {
        let avg = (100 * item.item.days_practiced) / item.item.days;
        let resp = Math.floor(avg);
        let per = resp + '%'

        return (
            <View style={styles.cardContainer}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/image/logo.png")}
                        style={{ width: 45, height: 45 }} />
                    <View style={styles.cardTextView}>
                        <TEXT title={item.item.title}
                            size={18}
                            color={Colors.gray}
                            // weight={"bold"}
                            family="Poppins-Bold"
                        />

                        <TEXT title={item.item.music_genre}
                            size={14}
                            color={Colors.gray3}
                            family="Poppins-Regular" />
                    </View>

                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "flex-end" }}
                        onPress={() => navigation.navigate("Pdf", { id: item.item.id })}
                    >
                        <Icon name="preview"
                            type="fontisto"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.dayText}>
                    <View style={{ width: "90%", flexDirection: "row" }}>
                        <TEXT title={`${item.item.days_practiced} days / ${item.item.daily_practice_time} minutes per day`}
                            size={14}
                            color={Colors.gray}
                            family="Poppins-Regular" />

                    </View>

                    <View style={styles.cardIcon}>
                        <Icon name="account-multiple"
                            type="material-community"
                            size={15}
                            color={Colors.white} />
                    </View>

                </View>
                <View style={styles.progressView}>
                    <View style={styles.progressBox}>
                        <View style={{ ...styles.progress, width: per }}></View>
                    </View>

                    <TEXT title={per}
                        size={14}
                        color={Colors.gray}
                        family="Poppins-Regular" />
                </View>
            </View>
        )
    };


    //Fetch API
    const getdata = async () => {
        setLoader(true)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://inq-assignment.herokuapp.com/assignment", requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result)
                setData(res)
                setLoader(false)
            })
            .catch(error => console.log('error', error));

    }

    useEffect(() => {
        getdata()
    }, [])

    // loader view
    if (loader) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator />
            </View>
        )
    }
    //Main view
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerview}>
                <Image source={require("../../assets/image/cover.png")}
                    style={styles.image}
                />
                <View style={styles.headercontain}>
                    <View style={styles.iconview}>
                        <Icon name="menu"
                            type="entypo"
                            color={Colors.white}
                            size={38} />
                    </View>

                    <View style={styles.usercontainer}>
                        <Image source={require("../../assets/image/user.png")}
                            style={styles.userImage} />

                        <TouchableOpacity style={styles.plusView}
                            onPress={() => navigation.navigate("Form")}
                        >
                            <Icon name="plus"
                                type="entypo"
                                color={Colors.black}
                                size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.bottomView}>
                <View style={styles.searchView}>
                    <Icon name="search1"
                        type="antdesign"
                        color={Colors.gray}
                        size={17} />

                    <TextInput placeholder="Search"
                        style={{ marginLeft: 10 }}
                        value={serchdata}
                        onChangeText={text => handleSearch(text)}
                        placeholderTextColor={Colors.gray} />
                </View>


                <View style={styles.card}>
                    <FlatList
                        data={data}
                        renderItem={item => {
                            return (
                                <RenderItem item={item} />
                            );
                        }}

                    />
                </View>

                {showsearch && (

                    <View style={styles.searchContainer}>
                        {serchdata.map((item, i) => {
                            return (
                                <View style={styles.searchSubview}>
                                    <Text>{item.title}</Text>
                                </View>
                            );
                        })}

                    </View>
                )}
            </View>

        </SafeAreaView>
    );
    // }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: "center", height: "100%", width: "100%", backgroundColor: Colors.lightblue
    },
    loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
    headerview: { width: "100%", height: 150 },
    image: { width: "100%", height: 100 },
    headercontain: { position: "absolute", height: "100%", width: "100%", padding: 15 },
    iconview: { alignItems: "flex-end", width: "100%", height: 45 },
    usercontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    userImage: {
        width: 80, height: 80
    },
    plusView: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: Colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 4 },
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 15
    },
    bottomView: { flex: 1, width: "100%", padding: 15, alignItems: "center" },
    searchView: {
        flexDirection: "row",
        width: "95%",
        height: 40,
        backgroundColor: Colors.white,
        borderRadius: 46,
        borderWidth: 1, borderColor: "#E0E0E0",
        alignItems: "center",
        paddingHorizontal: 15
    },
    card: { flex: 1, marginTop: 15, },
    searchContainer: { backgroundColor: "white", width: "90%", position: "absolute", marginTop: 60, padding: 10, borderRadius: 10 },
    searchSubview: { padding: 10, borderBottomWidth: 1, borderColor: "rgba(35,35,35,0.1)" },
    cardContainer: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginTop: 15,
        padding: 15,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOpacity: 0.5,
        shadowRadius: 7,
        elevation: 15
    },
    cardTextView: { marginLeft: 10, justifyContent: "space-around" },
    dayText: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20, },
    cardIcon: {
        width: 20,
        height: 20,
        borderRadius: 24 / 2,
        backgroundColor: Colors.orange,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-end", right: 0
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    progressView: { width: "100%", justifyContent: "space-between", flexDirection: "row", marginTop: 15, alignItems: "center" },
    progressBox: { width: "85%", height: 6, borderRadius: 10, backgroundColor: Colors.green },
    progress: { height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: Colors.darkgreen },
});

export default Profile;