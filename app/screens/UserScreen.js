import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { SIZES } from '../constants/data';
import { priorityDescriptionValues } from '../constants/priority';
import { useSelector } from 'react-redux';
import { selectTask } from '../redux/task';

const UserScreen = () => {
    const task = useSelector(selectTask);
    var done1 = 0;
        var done2 = 0;
        var done3 = 0;
        var undone1 = 0;
        var undone2 = 0;
        var undone3 = 0;
        for (let index = 0; index < task.length; index++) {
            const element = task[index];
            if (element.priority == 1) {
                if (element.done) {
                    done1++;
                }else{
                    undone1++;
                }
            }else if(element.priority == 2){
                if (element.done) {
                    done2++;
                }else{
                    undone2++;
                }
            }else{
                if (element.done) {
                    done3++;
                }else{
                    undone3++;
                }
            }
        }
    const data = {
        labels: ["Dealine", "Future", "Unimportant"],
        legend: ["Undone", "Done"],
        data: new Array(
            new Array(done1, undone1),
            new Array(done2, undone2),
            new Array(done3, undone3)
        ),
        barColors: ["#dfe4ea", "#a4b0be"]
    };
    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        },
        propsForLabels: {
            fontSize: 14
        }
    };
    return (
        <View style={styles.container}>
            <StackedBarChart
                //   style={graphStyle}
                data={data}
                width={SIZES.androidWidth.window}
                height={220}
                chartConfig={chartConfig}
            />
            <StatusBar style="dark" backgroundColor='white'/>
            <Text style={{
                fontSize: 20
            }}>
            Task completion chart
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default UserScreen;