import React from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'

export default function ResumeRow(props){
	const {item} = props
	console.log('item1',item[1])
	return (
		<View style = {styles.mainView}>
			<View style = {styles.flex2}>
				<MyText>{item[0]}</MyText>
			</View>
			<View style = {styles.flex1}>
				<MyText>{item[1][0].start}</MyText>
			</View>
			<View style = {styles.flex1}>
				<MyText>{item[1][0].end}</MyText>
			</View>
			<View style = {styles.flex1}>
				<MyText>{item[1][0].hours}H</MyText>
			</View>
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		flexDirection:'row'
	},
	flex1:{
		flex:1,
	},
	flex2:{
		flex:2
	}
})