import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTask } from '../redux/task';
import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { selectTask } from '../redux/task';

const CalendarScreen = () => {
    // const task = useSelector(selectTask);
    // const dispatch = useDispatch();
    // const [items, setItems] = useState({
    //     '2022-06-27': [{ name: 'item 1 - any js object' }],
    //     '2022-06-28': [{ name: 'item 2 - any js object', height: 80 }],
    //     '2022-06-29': [],
    //     '2022-06-30': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
    // });
    // const loadItems = (day) => {
    //     setTimeout(() => {
    //         for (let i = -15; i < 85; i++) {
    //             const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //             const strTime = timeToString(time);

    //             // if (!items[strTime]) {
    //             //     items[strTime] = [];

    //             //     const numItems = Math.floor(Math.random() * 3 + 1);
    //             //     for (let j = 0; j < numItems; j++) {
    //             //         items[strTime].push({
    //             //             name: 'Item for ' + strTime + ' #' + j,
    //             //             height: Math.max(50, Math.floor(Math.random() * 150)),
    //             //             day: strTime
    //             //         });
    //             //     }
    //             // }
    //         }

    //         const newItems = {};
    //         Object.keys(items).forEach(key => {
    //             newItems[key] = items[key];
    //         });
    //         //   this.setState({
    //         //     items: newItems
    //         //   });
    //         setItems(newItems);
    //     }, 1000);
    // }
    // const timeToString = (time) => {
    //     const date = new Date(time);
    //     return date.toISOString().split('T')[0];
    // }
    // const renderItem = (item) => {
    //     return (
    //         <TouchableOpacity style={{ marginRight: 10, marginTop: 17}}>
    //             <Card>
    //                 <Card.Content>
    //                     <View style={{
    //                         flexDirection: "row",
    //                         justifyContent: "space-between",
    //                         alignItems: "center"
    //                     }}>
    //                         <Text>
    //                             {item.name}
    //                         </Text>
    //                         <Avatar.Text label='T' />
    //                     </View>
    //                 </Card.Content>
    //             </Card>
    //         </TouchableOpacity>
    //     );
    // }
    // const today = new Date();
    // const getDayToString = (date) => {
    //     var d = new Date(date);
    //     var result = d.getFullYear + "-" + (d.getMonth() + 1) + "-" + (d.getDate() + 1);
    // }

    // useEffect(() => {
    //     var allTasks = {};
    //     for (let index = 0; index < task.length; index++) {
    //         const element = task[index];
    //         const ddd = new Date(element.dueDate);
    //         var elDate = getDayToString(ddd);
    //         allTasks = {...allTasks, 
    //             elDate : [{name: element.name}]
    //         }
    //     }
    //     // setItems({...items, 
    //     //     "2022-06-26" : [{name: "xu ly"}]
    //     // })
    //     setItems(allTasks);
    // }, []);
    return (
        <View style={styles.container}>
            {/* <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={getDayToString(today)}
                renderItem={renderItem}
            />
            <StatusBar style="auto" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
export default CalendarScreen;