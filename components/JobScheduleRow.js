import React from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'

export default function JobScheduleRow(props){
	const {hours,day,start,end} = props.item
	return (
		<View style={styles.mainView}>
			<View style={styles.day}><MyText style={styles.text}>{day}</MyText></View>
			<View style={styles.start}><MyText style={styles.text}>{start}</MyText></View>
			<View style={styles.end}><MyText style={styles.text}>{end}</MyText></View>
			<View style={styles.hours}><MyText style={styles.text}>{(hours)}</MyText></View>
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		flexDirection:'row',
		marginTop:5,
		marginBottom:5,

	},
	day:{
		flex:1,
	},
	start:{
		flex:1,
	},
	end:{
		flex:1,
	},
	hours:{
		flex:1,
	},
	text:{
		fontSize:16,
		borderBottomWidth:1,
		borderColor:'#6761a8'
	}
})