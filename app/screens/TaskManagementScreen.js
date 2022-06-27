import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, Pressable, TouchableHighlight, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTask, setDone, sortByPriority, deleteTask } from '../redux/task';
import Task from '../components/Task';
import { SIZES } from '../constants/data';
import IconFeather from "react-native-vector-icons/Feather";
import { AntDesign } from '@expo/vector-icons';
import AddEditTask from '../components/AddEditTask';
import ToDoTask from '../components/ToDoTask';
import { priorityDescriptionValues } from '../constants/priority';
import { ProgressChart } from 'react-native-chart-kit';

const TaskManagementScreen = () => {
    ///PROPERTIES
    var today = new Date();
    const task = useSelector(selectTask);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    // const [toDayTasks, setToDayTasks] = useState(null);
    var lastID = task.length != 0 ? task.length + 1 : 1;
    const [isAddNew, setIsAddNew] = useState(true);
    const [itemSelected, setItemSelected] = useState(null);
    const [totalTask, setTotalTask] = useState(0);
    const [numberOfTaskDone, setNumberOfTaskDone] = useState(0);
    //Properties for chart
    const data = {
        data: [totalTask == 0 ? 0 : numberOfTaskDone / totalTask]
    };
    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffffff",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(64, 255, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        propsForLabels: {
            fontSize: 0
        }
    };
    ///METHOD
    const getDonePercentToDayTask = (task) => {
        var total = 0;
        var taskDone = 0;
        for (let index = 0; index < task.length; index++) {
            const element = task[index];
            const elDate = new Date(element.dueDate);
            total++;
            if (element.done) {
                taskDone++;
            }
        }
        setTotalTask(total);
        setNumberOfTaskDone(taskDone);
        // console.log(totalTask);
        // console.log(numberOfTaskDone);
        // if (totalTask == 0) {
        //     setDonePer(0);
        // } else {
        //     setDonePer(numberOfTaskDone / totalTask);

        // }
    }
    const getToDayTasks = (tasks) => {
        var result = new Array();
        var d = new Date();
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            const date = new Date(element.dueDate);
            if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth() && date.getDate() === d.getDate()) {
                result.push(element);
            }
        }
        return result;
    }

    useEffect(() => {
        getDonePercentToDayTask(task, false, false);
        //console.log(task);
    }, []);
    const close = () => {
        setModalVisible(false);
    }
    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={{ ...styles.modalView, backgroundColor: isAddNew ? "#46539e" : "#51955b", }}>
                    <View
                        style={{
                            marginTop: -SIZES.androidHeightWithStatusBar.window * 0.008,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                textAlignVertical: "center",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                fontSize: SIZES.androidHeightWithStatusBar.window * 0.024,
                                color: "white"
                            }}
                        >
                            {isAddNew ? "Add task for today" : "Edit task"}
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <IconFeather
                                name="x-circle"
                                size={SIZES.androidHeightWithStatusBar.window * 0.05}
                                color="white"
                                style={{ textAlign: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <AddEditTask type={isAddNew ? "add" : "edit"} item={isAddNew ? lastID : itemSelected} closeModal={close}
                        add={() => {
                            //getDonePercentToDayTask(task, false, false);
                            setTotalTask(totalTask + 1);
                        }}
                    />
                    {/* {useBreathActive ? (text ? <GuideToUseBreathText /> : <GuideToUseBreathVideo />) : (text ? <GuideToUseMantraText /> : <GuideToUseMantraVideo />)} */}
                </View>
            </Modal>
            <ImageBackground source={require('../../assets/todaybg.jpg')} style={styles.bgToDay}>
                <View style={styles.headerView}>
                    <View style={{ flex: 3, alignItems: "center" }}>
                        <View style={{ ...styles.titleView, justifyContent: "center" }}>
                            <Text style={styles.title}>TASK MANAGEMENT</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
            <FlatList
                keyExtractor={(item) => item.name}
                data={task}
                renderItem={({ item }) => {
                    // const setDoneTask = () => {
                    //     dispatch(setDone(item.id));
                    //     // getDonePercentToDayTask(task, true, item.done ? false : true);
                    // }
                    // const del = () => {
                    //     dispatch(deleteTask(item.id))
                    // }
                    // const resetDonePer = (task) => {
                    //     getDonePercentToDayTask(task, false, false);
                    // }
                    const edit = () => {
                        setIsAddNew(false);
                        setItemSelected(item);
                        setModalVisible(true);
                    }
                    return (
                        <Task item={item}
                            done={item.done}
                            editItem={edit}
                            resetNumberOfTaskDoneBySetDone={(value) => {
                                setNumberOfTaskDone(numberOfTaskDone + value);
                            }}
                            resetNumberOfTaskDoneByDel={(isDone) => {
                                setTotalTask(totalTask - 1);
                                if (isDone) {
                                    setNumberOfTaskDone(numberOfTaskDone - 1);
                                }
                            }}
                        // deleteTask={del} 
                        />
                    );
                }}
            />
            <StatusBar
                style="light"
                backgroundColor='#011020'
                bar
            />
            <TouchableOpacity style={styles.add} onPress={() => {
                setIsAddNew(true);
                setModalVisible(true)
            }}>
                <AntDesign name="pluscircle" color="#2eb9ee" size={50} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: SIZES.androidHeightWithStatusBar.statusBar
    },
    textInput: {
        flex: 1,
        color: '#05375a',
    },
    modalView: {
        marginHorizontal: SIZES.androidHeightWithStatusBar.window * 0.025,
        marginTop: SIZES.androidHeightWithStatusBar.window * 0.22,
        borderRadius: 20,
        padding: SIZES.androidHeightWithStatusBar.window * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    button: {
        backgroundColor: "#ffffff00",
    },
    add: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    bgToDay: {
        width: SIZES.androidWidth.window,
        height: SIZES.androidHeightWithStatusBar.window * 0.07
    },
    headerView: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around"
    },
    title: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold"
    },
    today: {
        color: "white"
    },
    titleView: {
        flex: 1,
        justifyContent: "center",
    },
    statisticalTask: {
        color: "white"
    }
});
export default TaskManagementScreen;