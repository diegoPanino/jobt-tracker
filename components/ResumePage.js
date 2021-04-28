import React from 'react'
import {View,StyleSheet,Pressable,Modal,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyText from './MyText.js'
import ResumeRow from './ResumeRow.js'
import JobScheduleRow from './JobScheduleRow.js'

function ListFooter(h,money){
	return (
		<View style = {styles.footerMain}>
			<View style = {{flex:1}}><MyText>Total cash: {Number(money).toFixed(2)}$</MyText></View>
			<View style = {{flex:1}}><MyText>Total hours: {h}</MyText></View>
		</View>
		)
}

export default function ResumePage(props){
	const {toggleResumePage,selection,salary,totalH} = props
	return (
		<Modal>
		<View style = {styles.mainView}>
			<View style = {styles.titleView}>
				<View style = {styles.textTitleView}>
					<MyText>Resume Page</MyText>
				</View>
					<Pressable style = {styles.closeIco} onPress = {toggleResumePage}>
						<Icon name = 'close' size = {50} color = 'white' /> 
					</Pressable>
			</View>
			<View style = {styles.contentView}>
				<FlatList 
					data = {selection}
					renderItem = {({item})=><ResumeRow item = {item} />}
					keyExtractor = {item => item[0]}
					ListFooterComponent = {ListFooter(totalH,salary)}
				/>
			</View>
		</View>
		</Modal>
		)
}

const styles = StyleSheet.create({
	mainView:{
		flex:1,
		backgroundColor:'#2a2d34',
		zIndex:10,
		padding:5,
		paddingTop:15,
	},
	titleView:{
		flex:1,
		flexDirection:'row',
		borderBottomWidth:1,
		borderColor:'#6761A8'
	},
	textTitleView:{
		flex:2,
		justifyContent:'flex-end',
	},
	closeIco:{
		flex:1,
		alignItems:'flex-end',
		justifyContent:'flex-start'
	},
	contentView:{
		flex:6,
		marginTop:20,
	},
	footerMain:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
	}
})