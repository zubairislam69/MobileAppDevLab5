import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font'

const NewNote = ({ navigation }) => {

    // Load Fonts
    const [loaded] = useFonts({
        "Orbitron": require("../assets/fonts/Orbitron.ttf"),
        "AveriaSerifLibre-Regular": require("../assets/fonts/AveriaSerifLibre-Regular.ttf"),
        "AveriaSerifLibre-Bold": require("../assets/fonts/AveriaSerifLibre-Bold.ttf")
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const showToast = (message) => {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: message,
            visibilityTime: 3000,
        });
    };

    const saveNote = () => {
        if (title && description) {
            const note = { title, description };
            navigation.navigate('Home', { note });
        } else {
            showToast('Please fill in both title and description.')
        }
    };

    if (!loaded) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    placeholderTextColor="#777"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[styles.input, styles.multilineInput]}
                    placeholder="Description"
                    placeholderTextColor="#777"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline
                    numberOfLines={5}
                />
            </View>

            <TouchableOpacity style={[styles.saveButton, { width: '80%' }]} onPress={saveNote}>
                <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
            <Toast ref={(ref) => { Toast.setRef(ref); }} />
        </ScrollView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        backgroundColor: '#D2B48C',
        borderRadius: 8,
        marginBottom: 20,
        padding: 10,
    },
    input: {
        height: 40,
        color: '#000',
        fontFamily: "AveriaSerifLibre-Regular"
    },
    multilineInput: {
        height: 120,
        color: '#000',
        fontFamily: "AveriaSerifLibre-Regular"
    },
    saveButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Orbitron"
    },
});

export default NewNote;