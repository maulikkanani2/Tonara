import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';



const PDFExample = (route) => {

    const [data, setData] = useState<String>('')

    useEffect(() => {
        
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://inq-assignment.herokuapp.com/pdf/${route.route.params.id}`, requestOptions)
            .then(response => response.text())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }, [])

    const srcData = () => {
        let source = { uri: `data:application/pdf;base64,${data}` };
        return source;
    } 

    return (
        <View style={styles.container}>
            <Pdf
                source={srcData()}
                style={styles.pdf} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default PDFExample