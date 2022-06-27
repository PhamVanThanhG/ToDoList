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

const ToDayScreen = () => {
    ///PROPERTIES
    var today = new Date();
    const task = useSelector(selectTask);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    var lastID = task.length != 0 ? task[task.length - 1].id + 1 : 1;
    const [isAddNew, setIsAddNew] = useState(true);
    const [itemSelected, setItemSelected] = useState(null);

    var totalTask = 0;
    var numberOfTaskDone = 0;
    for (let index = 0; index < task.length; index++) {
        const element = task[index];
        const elDate = new Date(element.dueDate);
        if (elDate.getFullYear() === today.getFullYear() && elDate.getMonth() === today.getMonth() && elDate.getDate() === today.getDate()) {
            totalTask++;
            if (element.done) {
                numberOfTaskDone++;
            }
        }
    }
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

    // useEffect(() => {
    //     getDonePercentToDayTask(task, false, false);
    //     //console.log(task);
    // }, []);
    const close = () => {
        setModalVisible(false);
    }
    console.log("hello");
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
                            setTotalTask(totalTask + 1);
                        }}
                    />
                </View>
            </Modal>
            <ImageBackground source={require('../../assets/todaybg.jpg')} style={styles.bgToDay}>
                <View style={styles.headerView}>
                    <View style={{ flex: 3, alignItems: "center" }}>
                        <View style={{ ...styles.titleView, justifyContent: "center" }}>
                            <Text style={styles.title}>TODAY</Text>
                            <Text style={styles.title}>TASKS</Text>
                        </View>
                        <Text style={styles.today}>{today.toDateString("en-US")}</Text>
                    </View>
                    {/* <View style={{ flex: 5, justifyContent: "space-evenly" }}>
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>20</Text>
                            <Text style={styles.statisticalTask}>{priorityDescriptionValues[0]}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>20</Text>
                            <Text style={styles.statisticalTask}>{priorityDescriptionValues[1]}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, color: "white" }}>20</Text>
                            <Text style={styles.statisticalTask}>{priorityDescriptionValues[2]}</Text>
                        </View>
                    </View> */}
                    <View style={{ flex: 5 }}>
                        <ProgressChart
                            data={data}
                            width={SIZES.androidWidth.window * 0.71}
                            height={SIZES.androidHeightWithStatusBar.window * 0.23}
                            strokeWidth={14}
                            radius={50}
                            chartConfig={chartConfig}
                            hideLegend={true}
                        />
                        <Text style={{ color: "#40ff00", alignSelf: "center" }}>{((totalTask == 0 ? 0 : (numberOfTaskDone / totalTask)) * 100).toFixed(2)}% done</Text>
                    </View>
                </View>
            </ImageBackground>
            <FlatList
                keyExtractor={(item) => item.name}
                data={task}
                renderItem={({ item }) => {
                    const date = new Date(item.dueDate);
                    if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
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
                    }
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
        height: SIZES.androidHeightWithStatusBar.window * 0.26
    },
    headerView: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around"
    },
    title: {
        color: "white",
        fontSize: 30
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
export default ToDayScreen;