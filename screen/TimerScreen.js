import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,StyleSheet} from 'react-native'
import TimerButtons from '../components/TimerButtons.js'
import MyPicker from '../components/MyPicker.js'

export default function TimerScreen(){
	const [timerState,setTimerState] = useState('stop')
	useEffect(()=>{
		console.log(timerState)
	})

	return (
		<SafeAreaView style = {styles.safeArea}>
			<View style = {styles.mainView}>
				<View style = {styles.pickerContainer}>
					<MyPicker values = {['Job1','Josssssssss2','Job3']} onValueChange = {(val)=>console.log(val)} selectValue = 'Seleziona lavoro' containerStyle={styles.pickerStyle} />
				</View>
				<View style = {styles.timerContainer}>
					<View style = {styles.timer}>
						<Text>TIMER</Text>
					</View>
				</View>
				<TimerButtons />
			</View>
		</SafeAreaView>
		)
}

const styles = StyleSheet.create({
	safeArea:{
		flex:1,
		backgroundColor:'#2a2d34'
	},
	mainView:{
		flex:1,
		marginTop:'5%',
		justifyContent:'center',
		alignItems:'center',
	},
	pickerContainer:{
		flex:1,
		width:'80%',
		alignItems:'center',
		
	},
	pickerStyle:{
		padding:15,
		borderColor:'#6761a8',
		borderWidth:2,
		borderRadius:10,
		backgroundColor:'#009ddc'
	},
	timerContainer:{
		flex:3,
	},
	timer:{
		flex:2,
		justifyContent:'center',
		borderWidth:1,
	},
	btnContainer:{
		flex:1,
	},
	btnRow:{
		flex:1,
		alignItems:'center',
		flexDirection:'row',
	},
	btn:{
		marginRight:10,
		marginLeft:10,
	},
})


/*
<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {pause} >
						{((timerState !== 'pause') && (timerState === 'play')) && 
							<Icon name = 'pause' size = {100} />}
					</Pressable>
*/