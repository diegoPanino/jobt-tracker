import React from 'react'
import {SafeAreaView,View,Text,StyleSheet} from 'react-native'

export default function ResumeScreen(){
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.mainView}>
				<Text>resume</Text>
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
	}
})