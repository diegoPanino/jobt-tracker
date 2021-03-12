import React from 'react'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyButton from './MyButton.js'
import MyText from './MyText.js'

export default function JobRow({jobName,jobDel}){
	const deleteJob = () =>{
		jobDel(jobName)
	}
	return (
			<View style={styles.mainView}>
				<MyText>{jobName}</MyText>
				<MyButton press={deleteJob}>
					<Icon style={styles.ico} name = 'trash' size={20} color='#009ddc' />
				</MyButton>
					
			</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		marginRight:10,
		marginLeft:10,
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#6761a8',
		minHeight:50,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	ico:{

	}
})