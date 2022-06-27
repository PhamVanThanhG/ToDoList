import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ToDayScreen from './screens/ToDayScreen';
import CalendarScreen from './screens/CalendarScreen';
import UserScreen from './screens/UserScreen';
import TaskManagementScreen from './screens/TaskManagementScreen';

const Tab = createBottomTabNavigator();

const ToDoListBottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="ToDay"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Calendar"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'CalendarScreen',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="calendar" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="TaskManagement"
                component={TaskManagementScreen}
                options={{
                    tabBarLabel: 'AllTasks',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="ToDay"
                component={ToDayScreen}
                options={{
                    tabBarLabel: 'ToDay',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-today" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="UserScreen"
                component={UserScreen}
                options={{
                    tabBarLabel: 'UserScreen',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
export default MainContainer = () => {
    return (
        <NavigationContainer>
            <ToDoListBottomTab />
        </NavigationContainer>
    );
}