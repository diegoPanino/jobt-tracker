import React from 'react'
import {View,StyleSheet,Pressable,Modal,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyText from './MyText.js'
import ResumeRow from './ResumeRow.js'

export default function ResumePage(props){
	const {toggleResumePage,selection} = props
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
					renderItem = {ResumeRow}
					keyExtractor = {item => item[0]}
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
	}
})