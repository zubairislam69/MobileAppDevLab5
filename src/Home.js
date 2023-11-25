import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-elements'
import { Ionicons } from "@expo/vector-icons"
import { useFonts } from 'expo-font'

const Home = ({ route }) => {

    // Load Fonts
    const [loaded] = useFonts({
        "Orbitron": require("../assets/fonts/Orbitron.ttf"),
        "AveriaSerifLibre-Regular": require("../assets/fonts/AveriaSerifLibre-Regular.ttf"),
        "AveriaSerifLibre-Bold": require("../assets/fonts/AveriaSerifLibre-Bold.ttf")
    });

    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);

    const { note } = route.params || {};

    // Add new note to state on render
    useEffect(() => {
        if (note) {
            setNotes([...notes, note]);
        }
    }, [note])

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Notes</Text>
            {notes.length > 0 ? (
                <FlatList
                    data={notes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.noteItemContainer}
                        >
                            <Text style={styles.noteTitle}>{item.title}</Text>
                            <Text style={styles.noteDescription}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <Text style={styles.noNotes}>No notes here.</Text>
            )}

            <FAB
                title="ADD"
                placement="right"
                size="small"
                upperCase={true}
                icon={<Ionicons name="add-circle" size={24} color="white" />}
                buttonStyle={{ backgroundColor: "green" }}
                onPress={() => navigation.navigate('NewNote')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: "AveriaSerifLibre-Regular"
    },
    noteItemContainer: {
        backgroundColor: '#D2B48C',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 4,
    },
    noteTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: "AveriaSerifLibre-Bold"
    },
    noteDescription: {
        fontSize: 16,
        color: '#555',
        fontFamily: "AveriaSerifLibre-Regular"
    },
    noNotes: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#888',
        fontFamily: "AveriaSerifLibre-Regular"
    },
});

export default Home;
