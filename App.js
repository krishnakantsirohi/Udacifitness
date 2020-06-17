import React from 'react';
import {Platform} from 'react-native';
import AddEntry from "./components/AddEntry";
import {createStore} from "redux";
import {Provider} from 'react-redux';
import reducer from './reducers';
import History from "./components/History";
import createBottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {NavigationContainer} from "@react-navigation/native";
import {purple, white} from "./utils/colors";
import {Ionicons, FontAwesome} from '@expo/vector-icons';



export default class App extends React.Component{

    render() {
        const Tab = Platform.OS==='ios'?createBottomTabNavigator():createMaterialTopTabNavigator();
        return (
            <Provider store={createStore(reducer)}>
                    <NavigationContainer>
                        <Tab.Navigator
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({color}) => {
                                    if (route.name === 'History') {
                                        return <Ionicons name='ios-bookmarks' size={38} color={color}/>
                                    } else if (route.name === 'Add Entry') {
                                        return <FontAwesome name='plus-square' size={38} color={color}/>
                                    }
                                },
                            })}
                            navigationOptions={{
                                header: null,
                            }}
                            tabBarOptions={{
                            activeTintColor: Platform.OS==='ios'?purple:white,
                            style:{
                                height: 56,
                                backgroundColor: Platform.OS==='ios'?white:purple,
                                shadowColor: 'rgba(0,0,0,0.24)',
                                shadowOffset:{
                                    width:0,
                                    height: 3,
                                },
                                shadowRadius: 6,
                                shadowOpacity: 1,
                            }
                        }}>
                            <Tab.Screen name="History" component={History} />
                            <Tab.Screen name="Add Entry" component={AddEntry} />
                        </Tab.Navigator>
                    </NavigationContainer>
            </Provider>
        )
    }
}
