import 'react-native-gesture-handler'
import React from 'react'
import {SafeAreaView,StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import { Provider } from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store,persistor} from './redux/store'
import TimerScreen from './screen/TimerScreen.js'
import JobsScreen from './screen/JobsScreen.js'
import ResumeScreen from './screen/ResumeScreen.js'

const Tab = createBottomTabNavigator()
export default function App(){
  return (
      <SafeAreaView style = {styles.safeArea}>
        <Provider store = {store}>
          <PersistGate loading = {null} persistor = {persistor}> 
            <NavigationContainer>
              <Tab.Navigator  screenOptions = {({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === 'Timer') {
                  iconName = focused ? 'alarm-sharp' : 'alarm-outline'
                } else if (route.name === 'Job') {
                  iconName = focused ? 'briefcase-sharp' : 'briefcase-outline'
                } else if(route.name === 'Resume'){
                  iconName = focused ? 'calendar' : 'calendar-outline'
                } 
                return <Icon name = {iconName} size = {size} color = {color} />
              },
            })}
              tabBarOptions = {{
                activeTintColor: '#009ddc',
                inactiveTintColor: '#6761a8',
                style:{backgroundColor:'#2a2d34'},
                showLabel:false,
                keyboardHidesTabBar:true
              }}>
                <Tab.Screen name = 'Timer' component = {TimerScreen} />
                <Tab.Screen name = 'Job' component = {JobsScreen} />
                <Tab.Screen name = 'Resume' component = {ResumeScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  safeArea:{
    flex:1,
    backgroundColor:'#2a2d34'
  },
})