import React, { useRef, useState } from 'react'
import { View, Text, Pressable, StyleSheet, KeyboardAvoidingView, ScrollView, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../../Utility/Color';
import { useNavigation } from '@react-navigation/native';

const Form = () => {

    const navigation = useNavigation();
    const [title, setTitle] = useState<String>('')
    const [desc, setDesc] = useState<String>('')
    const [music_genre, setMg] = useState<String>("")
    const [dailytime, setDailytime] = useState<Number | null>(null)
    const [days, setDays] = useState<Number | null>(null)
    const [dayspra, setDayspra] = useState<Number | null>(null)

    const submit = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            title: title,
            description: desc,
            music_genre: music_genre,
            daily_practice_time: dailytime,
            days: days,
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

                setTitle('');
                setDesc('');
                setMg('');
                setDailytime('');
                setDays('');
                navigation.navigate("Home")


            })
            .catch(error => console.log('error', error));

    }


    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={styles.formContainer}>
            <ScrollView showsVerticalScrollIndicator={true} style={styles.scrollBox}>
                <KeyboardAvoidingView style={styles.boxFit} keyboardVerticalOffset={100} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
                    <View style={styles.formView}>
                        <Text style={{ fontSize: 25, }} >Register</Text>
                        <View style={styles.formElements}>
                            <Text>Title</Text>
                            <View style={styles.elementView}>
                                <TextInput
                                    onChangeText={text => setTitle(text)}
                                    value={title}
                                    placeholderTextColor="white" ></TextInput>
                            </View>
                            <Text style={{ marginTop: 15 }}>Description</Text>
                            <View style={styles.elementView}>
                                <TextInput
                                    onChangeText={text => setDesc(text)}
                                    value={desc}
                                    placeholderTextColor="white" ></TextInput>
                            </View>

                            <Text style={{ marginTop: 15 }}>Music genre</Text>
                            <View style={styles.elementView}>
                                <TextInput
                                    value={music_genre}
                                    onChangeText={text => setMg(text)}
                                    placeholderTextColor="white" ></TextInput>
                            </View>
                            <Text style={{ marginTop: 15 }}>Daily practice time</Text>
                            <View style={styles.elementView}>
                                <TextInput
                                    value={dailytime}
                                    keyboardType="numeric"
                                    onChangeText={text => setDailytime(text)}
                                    placeholderTextColor="white"></TextInput>
                            </View>


                            <Text style={{ marginTop: 15 }}>Days</Text>
                            <View style={styles.elementView}>
                                <TextInput
                                    value={days}
                                    keyboardType="numeric"
                                    onChangeText={text => setDays(text)}
                                    placeholderTextColor="white"
                                    onSubmitEditing={() => submit()}
                                ></TextInput>
                            </View>

                            <TouchableOpacity
                                style={styles.submitBox}
                                onPress={() => submit()}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </Pressable>

    );
}

const styles = StyleSheet.create({
    formContainer: { flex: 1, backgroundColor: Colors.white },
    scrollBox: { flex: 1, marginTop: 10, padding: 10, },
    boxFit: { width: "100%", height: "100%" },
    formView: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center" },
    formElements: { width: "100%", alignItems: "center", justifyContent: "space-evenly", marginTop: 15 },
    elementView: { width: "80%", marginTop: 5, borderWidth: 0.5, borderRadius: 15, padding: 8 },
    submitBox: { marginTop: 15, borderRadius: 10, backgroundColor: "rgba(24,163,246,0.5)", width: "50%", height: 40, alignItems: "center", justifyContent: "center" }
});

export default Form