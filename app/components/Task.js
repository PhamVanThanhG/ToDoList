import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const Task = ({ item, setDoneTask, deleteTask }) => {
    var priorityColor = "";

    switch (item.priority) {
        case 1:
            priorityColor = "red"
            break;
        case 2:
            priorityColor = "#f08d06"
            break;
        case 3:
            priorityColor = "#52f66e"
            break;
        default:
            break;
    }
    return (
        <View style={{ ...styles.container, borderRightColor: priorityColor }}>
            <View style={styles.check} >
                <TouchableOpacity
                    onPress={setDoneTask}
                >
                    <AntDesign name={item.done ? "checkcircle" : "checkcircleo"} color="#49e2ed" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.viewtext}>
                    <Text style={{ ...styles.task, textDecorationLine: item.done ? "line-through" : "none" }}>{item.task}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
                <View style={styles.delete}>
                    <TouchableOpacity onPress={deleteTask}>
                        <MaterialCommunityIcons name="delete" color="red" size={35} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderRightWidth: 8,
        marginVertical: 10,
    },
    check: {
        flex: 1,
        alignSelf: "center"
    },
    content: {
        flex: 8,
        flexDirection: "row",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    viewtext: {
        flex: 8
    },
    delete: {
        flex: 1,
        alignSelf: "center"
    },
    task: {
        fontWeight: "bold",
        fontSize: 20
    },
    description: {
        color: "gray"
    }
});
export default Task;