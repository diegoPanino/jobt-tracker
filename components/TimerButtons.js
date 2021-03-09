import React,{useState} from 'react'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyButton from './MyButton.js'

export default function TimerButtons(props){
	const [timerState,setTimerState] = useState('stop')

	const stop = () =>{
		setTimerState('stop')
	}
	const play = () =>{
		setTimerState('play')
	}
	const pause = () =>{
		setTimerState('pause')
	}
	const pressedStyle = pressed =>[{
		borderRadius:60,
		borderWidth:2,
		borderColor:pressed ? '#f26430' : 'transparent'
	},styles.btn]

	return (
		<View style = {styles.btnRow}>
			<MyButton style={({pressed})=>pressedStyle(pressed)} press = {pause} >
				{((timerState !== 'pause') && (timerState === 'play')) && 
					<Icon name = 'pause' size = {100} color='#009ddc' />}
			</MyButton>
			<MyButton style = {({pressed})=>pressedStyle(pressed)} press = {play}>
				{!(timerState === 'play') &&
					<Icon name = 'play' size = {100} color='#009ddc' />}
			</MyButton>
			<MyButton style = {({pressed})=>pressedStyle(pressed)} press = {stop}>
				{(timerState !== 'stop') && 
					<Icon name = 'stop' size = {100} color='#009ddc' />}
			</MyButton>
		</View>
		)
}

const styles = StyleSheet.create({
	btnRow:{
		flex:1,
		alignItems:'center',
		flexDirection:'row',
	},
})