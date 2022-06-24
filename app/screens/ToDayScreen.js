import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setDone } from '../redux/task';
import Task from '../components/Task';

const ToDayScreen = () => {
    const task = useSelector(state => state.task.value);
    const dispatch = useDispatch();
    const [toDayTasks, setToDayTasks] = React.useState(null);

    console.log(task);
    // useEffect(() => {
    //     var d = new Date();
    //     task.forEach(element => {
    //         if (element.date.getFullYear() === d.getFullYear() && element.date.getMonth() === d.getMonth() && element.date.getDate() === d.getDate()) {
    //             setToDayTasks(element);
    //             //console.warn(element);
    //             //console.warn(element.date.getFullYear());
    //         }
    //     });
    // })
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