import React from 'react'
import {Text,StyleSheet} from 'react-native'

export default function MyText(props){
	const children = props.children
	return (
		<Text {...props} style={[styles.text,props.style]}>{children}</Text>
		)
}
const styles = StyleSheet.create({
	text:{
		fontSize:20,
		color:'white',
	}
})