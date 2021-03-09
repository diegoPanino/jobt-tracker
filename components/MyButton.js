import React from 'react'
import {Pressable} from 'react-native'

export default function MyButton(props){
	const {children,delay=50} = props
	const delayedPress = () =>{
		setTimeout(props.press,delay)
	}
	return (
		<Pressable onPress = {()=>delayedPress()} style={props.style} {...props}>
			{children}
		</Pressable>
		)
}