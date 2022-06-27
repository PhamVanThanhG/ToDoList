import { Text, StyleSheet, View, TextInput, Button, Platform, TouchableOpacity } from 'react-native'
import { SIZES } from '../constants/data';
import React, { useState, useRef } from 'react';
import { FontAwesome, MaterialIcons, Fontisto } from '@expo/vector-icons';
import { priorityDescriptionValues } from '../constants/priority';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import task, { addNewTask, editTask } from '../redux/task';
import ToDoTask from './ToDoTask';

const AddEditTask = ({ type, item, closeModal, add }) => {
    ///PROPERTIES
    var isAdd = type == "add" ? true : false;
    var id = item;
    const dispatch = useDispatch();
    const [name, setName] = useState(isAdd ? "" : item.name);
    const [description, setDescription] = useState(isAdd ? "" : item.description);
    const [priority, setPriority] = useState(isAdd ? "" : item.priority);
    const [date, setDate] = useState(isAdd ? new Date() : new Date(item.dueDate));
    const [show, setShow] = useState(false);
    const nameTextInput = useRef(null);
    ///METHOD
    //Function for change datepicker
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    //Function for add new task
    const addTask = () => {
        if (name.length == 0) {
            alert("You must enter task's name!");
            nameTextInput.current.focus();
            return;
        }
        if (priority == 0) {
            alert("You must select task's priority!");
            return;
        }
        if (isAdd) {
            var newTask = new ToDoTask(id, date, name, description, priority, false);
            dispatch(addNewTask(newTask));
            setName("");
            setDescription("");
            setDate(new Date());
            id++;
            add();
            alert("Add new task successfully!");
        } else {
            closeModal();
            var taskToEdit = new ToDoTask(item.id, date, name, description, priority, item.done);
            //console.log(taskToEdit);
            dispatch(editTask(taskToEdit));
            alert("Edit task successfully!");
        }
    }

    return (
        <View
            height={
                SIZES.androidHeightWithStatusBar.window * 0.45
            }
            style={{ justifyContent: "space-around" }}
        >
            <View style={styles.action}>
                <FontAwesome
                    name="tasks"
                    color="white"
                    size={30}
                />
                <TextInput
                    value={name}
                    ref={nameTextInput}
                    placeholder="Enter task's name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setName(val)}
                />
            </View>
            <View style={styles.action}>
                <MaterialIcons
                    name="import-export"
                    color="white"
                    size={30}
                />
                <ModalDropdown
                    options={priorityDescriptionValues}
                    onSelect={index => setPriority(index + 1)}
                    defaultValue={isAdd ? "Select priority of the task..." : priorityDescriptionValues[priority - 1]}
                    defaultIndex={isAdd ? -1 : (priority - 1)}
                    style={styles.major}
                    textStyle={{ color: "white", fontSize: 18 }}
                    dropdownTextStyle={{ fontSize: 18 }}
                />
            </View>
            <View style={styles.action}>
                <MaterialIcons
                    name="description"
                    color="white"
                    size={30}
                />
                <TextInput
                    value={description}
                    placeholder="Enter task's description"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => setDescription(val)}
                />
            </View>
            <View style={styles.datepicker}>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <Fontisto
                        name="date"
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShow(true)}>
                    <View style={styles.dateViewShow}>
                        <Text style={styles.dateTextShow}>{date.toDateString("en-US")}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'date'}
                    display={'default'}
                    onChange={onChange}
                />
            )}
            <TouchableOpacity
                onPress={addTask}
                style={[styles.signIn, {
                    marginTop: 15,
                    backgroundColor: isAdd ? '#2ebaef' : "#099ed6"
                }]}
            >
                <Text style={[styles.textSign, {
                    color: "white"
                }]}>{isAdd ? "ADD YOUR TASK" : "EDIT TASK"}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -8,
        paddingLeft: 10,
        color: 'white',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    major: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: SIZES.androidWidth.window - 40,
        color: 'white',
        borderWidth: 0.3,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        borderRadius: 25
    },
    datepicker: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    dateViewShow: {
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 10,
        marginLeft: 10,
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    dateTextShow: {
        fontSize: 18
    },
    signIn: {
        width: '100%',
        height: SIZES.androidHeightWithStatusBar.window * 0.050,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: SIZES.androidHeightWithStatusBar.window * 0.020,
        fontWeight: 'bold'
    },
})

export default AddEditTask;