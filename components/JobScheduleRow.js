import React from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'

export default function JobScheduleRow(props){
	
	const {day,startTime,endTime,hours} = props.item[0]
	return (
		<View style={styles.mainView}>
			<MyText>{startTime}</MyText>
			<MyText>{endTime}</MyText>
			<MyText>{hours}</MyText>
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flexDirection:'row'
	},
})