import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { priorityDescriptionValues } from '../constants/priority';
import { useDispatch } from 'react-redux';
import { deleteTask, setDone } from '../redux/task';

const Task = ({ item, editItem, resetNumberOfTaskDoneBySetDone, resetNumberOfTaskDoneByDel, done }) => {
    const [doneT, setDoneT] = useState(item.done);
    const dispatch = useDispatch();
    var priorityColor = "";
    const date = new Date(item.dueDate);
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
    const setDoneTask = () => {
        dispatch(setDone(item.id))
    }
    const del = () => {
        resetNumberOfTaskDoneByDel(doneT);
        dispatch(deleteTask(item.id));
    }
    return (
        <View style={{ ...styles.container, borderRightColor: priorityColor, backgroundColor: done ? "#d0d0d0": "white" }}>
            <View style={styles.check} >
                <TouchableOpacity
                    onPress={() => {
                        setDoneTask();
                        resetNumberOfTaskDoneBySetDone(doneT ? -1 : 1);
                        setDoneT(!doneT);
                    }}
                    
                >
                    <AntDesign name={done ? "checkcircle" : "checkcircleo"} color="#00484d" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.viewtext}>
                    <Text style={{ ...styles.task, textDecorationLine: done ? "line-through" : "none" }}>{item.name}</Text>
                    <Text>Priority: {priorityDescriptionValues[item.priority - 1]}</Text>
                    <Text>Due date: {date.toDateString("en-US")}</Text>
                    <Text style={styles.description}>Description: {item.description.length == 0 ? "No description" : item.description}</Text>
                </View>
                <View style={styles.editdelete}>
                    <TouchableOpacity onPress={editItem}>
                        <AntDesign name="edit" color="blue" size={35}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={del}>
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
        marginBottom: 10,
        paddingLeft: 15
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
    editdelete: {
        justifyContent: "space-around"
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