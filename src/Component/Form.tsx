import React, { useRef, useState } from 'react'
import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../../Utility/Color';

export const Form = (props: any) => {
    const { title, desc, mg, dailytime, days, dayspra } = props


    const [email, setEmail] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const onChangeText = (email) => {
        console.log("email", email);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setModalVisible(false)
            console.log(modalVisible)
        }
        else {
            setModalVisible(true)
            console.log("console.log(modalVisible)", modalVisible)
        }
    }
    const [password, setPassword] = useState('');
    const [passwordVisible, setpasswordVisible] = useState(false);

    const onChangeTextBelow = (password) => {
        console.log("password", password);
        if (/[a-z]@[0-9]/.test(password)) {
            setpasswordVisible(false)
            console.log(passwordVisible)
        }
        else {
            setpasswordVisible(true)
            console.log("console.log(passwordVisible)", passwordVisible)
        }
    }

    return (
        <Pressable onPress={() => Keyboard.dismiss()}
            style={{ width: "80%", height: "80%", alignItems: "center", justifyContent: "center" }}
        // style={{alignItems:"center",justifyContent:"center",backgroundColor:Colors.white , width:"100%"}}
        >
            <KeyboardAvoidingView style={{ flex: 1, width: "100%", backgroundColor: Colors.white,borderRadius:15 ,height:"100%"}} keyboardVerticalOffset={100} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                {/* <ScrollView showsVerticalScrollIndicator={true} style={{ width: "100%",marginTop:10,flex:1,}}> */}
                    <View style={{ flex:1, width: "100%",height:"100%",justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 25,}} >Register</Text>
                        <View style={{  width: "100%", alignItems: "center",justifyContent:"space-evenly",marginTop:15 }}>
                            <Text style={{  }}>Title</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput
                                    onChangeText={text => props.settitle(text)}
                                    value={title}
                                    placeholderTextColor="white" ></TextInput>
                            </View>
                            {/* {validateUsername === true && username !== '' ? (
                            <Text style={styles.validateUsername}>
                                Invalid!
                            </Text>
                        ) : null
                        } */}
                            <Text style={{ marginTop: 15 }}>Description</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput
                                onChangeText={text => props.setdesc(text)}
                                value={desc}
                                    placeholderTextColor="white" ></TextInput>
                            </View>

                            <Text style={{ marginTop: 15 }}>Music genre</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput
                                   value={mg}
                                   onChangeText={text =>props.setmg(text)}
                                    placeholderTextColor="white" ></TextInput>
                            </View>
                            <Text style={{ marginTop: 15 }}>Daily practice time</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput
                                value={dailytime}
                                keyboardType="numeric"
                                    onChangeText={text =>props.setdailytime(text)}
                                  
                                    placeholderTextColor="white"></TextInput>
                            </View>


                            <Text style={{ marginTop: 15 }}>Days</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput 
                                    value={days}
                                    keyboardType="numeric"
                                    onChangeText={text =>props.setdays(text)}
                                    placeholderTextColor="white"></TextInput>
                            </View>

{/* 
                            <Text style={{ marginTop: 15 }}>Days practiced</Text>
                            <View style={{ width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 }}>
                                <TextInput value={dayspra}
                                onChangeText={text =>props.setdaypra(text)}
                                    placeholderTextColor="white"></TextInput>
                            </View> */}

                            <TouchableOpacity
                                style={{ marginTop: 15, borderRadius: 10, backgroundColor: "rgba(24,163,246,0.5)", width: "50%", height: 40, alignItems: "center", justifyContent: "center" }}
                                onPress={() => props.show()}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginTop: 15, borderRadius: 10, backgroundColor: "rgba(24,163,246,0.2)", width: "50%", height: 40, alignItems: "center", justifyContent: "center" }}
                                onPress={() => props.showcancle(false)}>
                                <Text>Cancle</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </Pressable>
    );
}