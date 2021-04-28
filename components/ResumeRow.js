import React from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'
import {getMoneyFromH,sumH} from '../utility/Utility.js'

export default function ResumeRow(props){
	const {item,salary} = props
	const dateTmp = item[0].split('/')
	const date = dateTmp[0]+'/'+dateTmp[1]+'/'+dateTmp[2][2]+dateTmp[2][3]
	const hours = item[1][1] ? sumH(item[1][0].hours,item[1][1].hours) : item[1][0].hours

	if(item[1].length > 2){
		return (
			<View style = {styles.mainView}>
				<View style = {styles.dateContainerMulti}>
					<MyText style = {styles.text}>{date}</MyText>
				</View>
				<View style = {styles.daysContainerMulti}>
					{ item[1].map(day => {
						return(
							<View style = {styles.daysLineMulti}>
								<View style = {styles.fromToMulti}>
									<MyText style = {styles.text}>{day.start}-{day.end}</MyText>
								</View>
								<View style = {styles.hoursMulti}>
									<MyText style = {styles.text}>{day.hours} H</MyText>
								</View>
							</View>	
							)
						})
					}
				</View>
			</View>
			)
	}
	else{
		return (
			<View style = {styles.mainView}>
				<View style = {styles.date}>
					<MyText style={styles.text}>{date}</MyText>
				</View>
				<View style = {styles.flexTimes}>
					<MyText style={styles.text}>{item[1][0].start}-{item[1][0].end}</MyText>
				</View>
					<View style = {styles.times}>
						<MyText style={styles.text}>{item[1][1]?.start || ''}-{item[1][1]?.end || ''}</MyText>
					</View>
				<View style = {styles.hours}>
					<MyText style={styles.text}>{hours} H</MyText>
				</View>
			</View>
			)
		}
}

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		flexDirection:'row',
		borderBottomWidth:3,
		borderColor:'#6761A8',
		padding:2,
	},
	date:{
		borderRightWidth:1,
		borderColor:'#6761A8',
		paddingRight:3,
	},
	flexTimes:{
		flex:1,
		flexGrow:1,
		alignItems:'center',
	},
	times:{
		flex:1,
		borderRightWidth:1,
		borderColor:'#6761A8',
		alignItems:'center',
	},
	hours:{
		paddingLeft:5,
	},
	text:{
		fontSize:17
	},
	dateContainerMulti:{
		paddingRight:3,
		alignSelf:'center',
	},
	daysContainerMulti:{
		flex:3,
		borderLeftWidth:1,
		borderColor:'#6761A8',
		paddingLeft:3,
	},
	daysLineMulti:{
		flex:1,
		flexDirection:'row',
	},
	fromToMulti:{
		flex:1,
		paddingLeft:5,
	},
	hoursMulti:{
		alignItems:'flex-end',
		borderLeftWidth:1,
		borderColor:'#6761A8',
		paddingLeft:5,
	}

})