import React, { useEffect, useState } from 'react'
import { View, Text, Image, SafeAreaView, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements';

import { Form } from '../Component/Form'
import { TEXT } from '../Component/TEXT'
import { Colors } from '../../Utility/Color'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';

const Profile = () => {
    const [show, setShow] = useState(false)
    const [data, setData] = useState()
    const [loader, setLoader] = useState(false)
    const [serchdata, setSearchdata] = useState("")

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [mg, setMg] = useState("")
    const [dailytime, setDailytime] = useState("")
    const [days, setDays] = useState("")
    const [dayspra, setDayspra] = useState("")
    const [showsearch, setShowsearch] = useState(false)

    const [query, setQuery] = useState('');

    const handleSearch = (queryText) => {
        console.log("#####",queryText.length)
        
      //  console.log("$$$$", serchdata)

        {
            data.map((item, i) => {
                setSearchdata(item.title)
            })
        }

        setQuery(queryText);

        setShowsearch(true)
        let filteredData = data.filter(function (item) {
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

        if(queryText.length == 0){
            setShowsearch(false)
        }

    }

    const renderItem = ({ item }) => {

        let avg = (100 * item.days_practiced) / item.days;
        let resp = Math.floor(avg);
        let per = resp + '%'
      
        // daysPerformance(parseInt(item.days_practiced), parseInt(item.days))
        return (
            <View style={{
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
            }}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/image/logo.png")}
                        style={{ width: 45, height: 45 }} />
                    <View style={{ marginLeft: 10, justifyContent: "space-around" }}>
                        <TEXT title={item.title}
                            size={18}
                            color={Colors.gray}
                           // weight={"bold"}
                            family="Poppins-Bold"
                             />

                        <TEXT title={item.music_genre}
                            size={14}
                            color={Colors.gray3}
                            family="Poppins-Regular" />
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20, }}>
                    <View style={{ width: "90%", flexDirection: "row" }}>
                        <TEXT title={`${item.days_practiced} days / ${item.daily_practice_time} minutes per day`}
                            size={14}
                            color={Colors.gray}
                            family="Poppins-Regular" />
                      
                    </View>

                    <View style={{
                        width: 20,
                        height: 20,
                        borderRadius: 24 / 2,
                        backgroundColor: Colors.orange,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-end", right: 0
                    }}>
                        <Icon name="account-multiple"
                            type="material-community"
                            size={15}
                            color={Colors.white} />
                    </View>

                </View>
                <View style={{ width: "100%", justifyContent: "space-between", flexDirection: "row", marginTop: 15, alignItems: "center" }}>
                    <View style={{ width: "85%", height: 6, borderRadius: 10, backgroundColor: Colors.green }}>
                        <View style={{ width: per, height: "100%", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: Colors.darkgreen }}></View>
                    </View>

                    <TEXT title={per}
                        size={14}
                        color={Colors.gray}
                        family="Poppins-Regular" />
                </View>
            </View>
        )
    };


    const submit = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            title: title,
            description: desc,
            music_genre: mg,
            daily_practice_time: dailytime,
            days: days,
            days_practiced: 0
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://inq-assignment.herokuapp.com/assignment", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                setShow(false);
                setTitle('');
                setDesc('');
                setMg('');
                setDailytime('');
                setDays('');
                setDayspra('');
                getdata();
            })
            .catch(error => console.log('error', error));

    }

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



    
    if (loader) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        )
    }
    if (!loader) {
        return (
            <SafeAreaView style={{ flex: 1, alignItems: "center", height: "100%", width: "100%", backgroundColor: Colors.lightblue }}>
                <View style={{ width: "100%", height: 150 }}>
                    <Image source={require("../../assets/image/cover.png")}
                        style={{ width: "100%", height: 100 }}
                    />
                    <View style={{ position: "absolute", height: "100%", width: "100%", padding: 15 }}>
                        <View style={{ alignItems: "flex-end", width: "100%", height: 45 }}>
                            <Icon name="menu"
                                type="entypo"
                                color={Colors.white}
                                size={38} />
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end"
                        }}>
                            <Image source={require("../../assets/image/user.png")}
                                style={{ width: 80, height: 80 }} />

                            <TouchableOpacity style={{
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
                            }}
                                onPress={() => setShow(true)}
                            >
                                <Icon name="plus"
                                    type="entypo"
                                    color={Colors.black}
                                    size={28} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                <View style={{ flex: 1, width: "100%", padding: 15, alignItems: "center" }}>
                    <View style={{
                        flexDirection: "row",
                        width: "95%",
                        height: 40,
                        backgroundColor: Colors.white,
                        borderRadius: 46,
                        borderWidth: 1, borderColor: "#E0E0E0",
                        alignItems: "center",
                        paddingHorizontal: 15
                    }}>
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
                    

                    <View style={{ flex: 1, marginTop: 15, }}>
                        <FlatList
                            data={data}
                            renderItem={renderItem}

                        />
                    </View>

                    {showsearch  && (

                        <View style={{ backgroundColor: "white", width: "90%", position: "absolute" ,marginTop:60,padding:10,borderRadius:10}}>
                            {serchdata.map((item, i) => {
                                console.log("666",serchdata.length)
                                return (
                                    <View style={{padding:10,borderBottomWidth:1,borderColor:"rgba(35,35,35,0.1)"}}>
                                    <Text>{item.title}</Text>
                                    </View>
                                );
                            })}

                        </View>
                    ) }
                </View>


                {show &&
                    <View style={{
                        position: "absolute",
                        backgroundColor: "rgba(35,35,35,0.5)",
                        width: "100%",
                        height: "110%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Form title={title}
                            settitle={setTitle}
                            desc={desc}
                            setdesc={setDesc}
                            mg={mg}
                            setmg={setMg}
                            dailytime={dailytime}
                            setdailytime={setDailytime}
                            days={days}
                            setdays={setDays}
                            dayspra={dayspra}
                            setdaypra={setDayspra}
                            show={submit} 
                            showcancle={setShow}/>
                    </View>
                }
            </SafeAreaView>
        );
    }
}

export default Profile;