import React from 'react'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyText from './MyText.js'

export default function  ModalManageEntries(props){
	const {selection} = props
	return (
		<View style = {styles.mainView}>
			<View style = {styles.counter}>
				<MyText style = {styles.textCounter}>{selection.length} selected</MyText>
			</View>
			<View style = {styles.iconsRow}>
				<View style = {styles.icoContainer}>
					<Icon name = 'logo-usd' size = {50} color = '#009ddc' />				
					<MyText style = {styles.textCounter}>paid/unpaid</MyText>
				</View>
				<View style = {[styles.icoContainer,styles.centerContainer]}>
					<Icon name = 'clipboard-outline' size = {50} color = '#009ddc' />
					<MyText style = {styles.textCounter}>resume</MyText>
				</View>
				<View style = {styles.icoContainer}>
					<Icon name = 'trash-outline' size = {50} color = '#009ddc' />
					<MyText style = {styles.textCounter}>delete</MyText>
				</View>
			</View>
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		width:'98%',
	},
	counter:{
		flex:0.5,
		alignItems:'flex-end'
	},
	textCounter:{
		fontSize:12,
	},
	iconsRow:{
		flex:2,
		flexDirection:'row',
		justifyContent:'space-around',
	},
	icoContainer:{
		flex:1,
		margin:5,
		justifyContent:'center',
		alignItems:'center',
	},
	centerContainer:{
		borderRightWidth:1,
		borderLeftWidth:1,
		borderColor:'#009ddc',
	}
})