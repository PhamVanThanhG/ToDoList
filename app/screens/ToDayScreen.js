import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTask, setDone } from '../redux/task';
import Task from '../components/Task';

const ToDayScreen = () => {
    const task = useSelector(selectTask);
    const dispatch = useDispatch();
    const [toDayTasks, setToDayTasks] = useState(new Array());

    useEffect(() => {
        var d = new Date("06/25/2022");
        // task.forEach(element => {
        //     const date = new Date(element.dueDate);
        //     if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
        //         setToDayTasks([...toDayTasks, element]);
        //         //console.log(element);
        //     }
        // });
        for (let index = 0; index < task.length; index++) {
            const element = task[index];
            const date = new Date(element.dueDate);
            if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
                setToDayTasks(toDayTasks.push(element));
                //console.log(element);
            }
        }
        //console.log(toDayTasks);
    })
    console.log(toDayTasks.length);

    //console.log(task);
    return (
        <View style={styles.container}>
            {
                toDayTasks != null ?
                    <FlatList
                        data={toDayTasks.tasks}
                        renderItem={({ item }) => {
                            const setDoneTask = () => {
                                dispatch(setDone())
                            }
                            const deleteTask = () => {
                                alert("delete");
                            }
                            return (
                                <Task item={item} setDoneTask={setDoneTask} deleteTask={deleteTask}/>
                            );
                        }}
                    />
                    : null
            }
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 15
    },
    textInput: {
        flex: 1,
        color: '#05375a',
    },
});
export default ToDayScreen;