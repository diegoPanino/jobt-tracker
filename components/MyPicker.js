import React,{useState,useEffect,useRef} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'

export default function MyPicker(props){
	const {values,onValueChange,selectValue} = props
	const {icon=true,iconStyle={},textStyle={},pickeItemStyle={},xOffset=0,yOffset=0,menuStyle={},containerStyle={}} = props
	const [dropMenu,setDropMenu] = useState(false)
	const [selectedItem,setSelectedItem] = useState(selectValue)
	const [x,setX] = useState()
	const [y,setY] = useState()
	const [width,setWidth] = useState()
	const [height,setHeight] = useState()
	const pickerBar = useRef(null)
	const textRef = useRef(null)

	useEffect(()=>{
		setSelectedItem(selectValue)
	},[selectValue])
	useEffect(()=>{
		onValueChange(selectedItem)
	},[selectedItem])

	const MyPickerItems = values.map((el,i)=>{
		return (
			<TouchableOpacity style = {[{height:height},styles.pickerItem,pickeItemStyle]} key = {i} onPress = {()=>selectItem(el)}>
				<Text style = {textStyle}>{el}</Text>						
			</TouchableOpacity>
		)
	})

	const selectItem=el=>{
		setSelectedItem(el)
		setDropMenu(false)
	}
	const toggleDropMenu=()=>{
		setDropMenu(prevState=>!prevState)
	}
	const measureEl=()=>{
		setTimeout(()=>pickerBar.current.measure((x,y,width,height,px,py) => {
			setX(px)
			setY(py)
			setWidth(width)
			setHeight(height)
		}),0)
	}

	return (
		<View>
			<TouchableOpacity onPress = {toggleDropMenu} style = {[styles.pickerBar,containerStyle,dropMenu ? styles.dropMenuOpen : '']} 
							ref = {pickerBar} onLayout = {event=>measureEl(event)} activeOpacity={0.8}>
				<View style = {styles.inputContainer} >
					<View style={styles.textContainer}><Text style = {textStyle}>{selectedItem}</Text></View>
					{icon && <View style={styles.icoContainer}><Icon name = {dropMenu ? 'caret-up' : 'caret-down'} style = {[styles.icon,iconStyle]}/></View>}
				</View>
				
			</TouchableOpacity>
			<Modal animationType = "slide" transparent = {true} visible = {dropMenu} >
				<TouchableOpacity style = {styles.mainContentModal} onPress = {toggleDropMenu} />
					<View style = {[styles.dropMenuContainer,menuStyle,{width:width,left:x-xOffset,top:y + height}]} >
						<ScrollView>
							{MyPickerItems}
						</ScrollView>
					</View>
			</Modal>
		</View>
		)
}

const styles=StyleSheet.create({
	mainContentModal:{
		flex:1,
		left:0,
		top:0,
		bottom:0,
		right:0,
		zIndex:1,
		elevation:1,
	},
	pickerBar:{
		flexDirection:'row',
	},
	inputContainer:{
		width:'100%',
		flexDirection:'row',
	},
	textContainer:{
		flex:10,
		alignItems:'center'
	},
	icoContainer:{
		flex:1,
		justifyContent:'center',
		alignItems:'flex-end',
	},
	dropMenuContainer:{
		position:'absolute',
		backgroundColor:'white',
		borderTopWidth:0,
		borderTopLeftRadius:0,
		borderTopRightRadius:0,
		borderWidth:1,
		borderRadius:10,
		zIndex:5,
		elevation:5
	},
	pickerItem:{
		borderBottomWidth:1,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
	dropMenuOpen:{
		borderBottomWidth:0,
		borderBottomLeftRadius:0,
		borderBottomRightRadius:0,
	}
})



/*

import React,{useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default function MyPicker(props){
	const {values,onValueChange,selectValue} = props
	const {icon=true,iconStyle={},textStyle={},pickeItemStyle={},offset=2,menuStyle={},dropMenuHeight=300} = props
	const [dropMenu,setDropMenu] = useState(false)
	const [selectedItem,setSelectedItem] = useState(selectValue)
	const [x,setX] = useState()
	const [y,setY] = useState()
	const [height,setHeight] = useState()
	const pickerBar = useRef(null)

	useEffect(()=>{
		onValueChange(selectedItem)
	},[selectedItem])

	useEffect(()=>{
		setTimeout(()=>pickerBar.current.measure((fx, fy, width, height, px, py) => {
			setX(px)
			setY(py)
			setHeight(height)
		}),0)
		
	},[])

	const MyPickerItems = values.map((el,i)=>{
		return (
			<TouchableOpacity style={[styles.pickerItem,pickeItemStyle]} key={i} onPress={()=>selectItem(el)}>
				<Text style={textStyle}>{el}</Text>						
			</TouchableOpacity>
		)
	})
	const selectItem=el=>{
		setSelectedItem(el)
		setDropMenu(false)
	}
	const toggleDropMenu=()=>{
		setDropMenu(prevState=>!prevState)
	}

	return (
		<View>
			<TouchableOpacity onPress={toggleDropMenu} style={[styles.pickerBar]} ref={pickerBar}>
				<Text style={[styles.text,textStyle]}>{selectedItem}</Text>
				{icon && <View style={styles.icoContainer}><Icon name='caret-down' style={[styles.icon,iconStyle]}/></View>}
			</TouchableOpacity>
			<Modal animationType="slide" transparent={true} visible={dropMenu} >
				<TouchableOpacity style={styles.mainContentModal} onPress={toggleDropMenu} />
					<View style={[styles.dropMenuContainer,menuStyle,{height:dropMenuHeight,left:x,top:y }]} >
						<ScrollView>
							{MyPickerItems}
						</ScrollView>
					</View>
			</Modal>
		</View>
		)
}

const styles=StyleSheet.create({
	mainContentModal:{
		position:'absolute',
		flex:1,
		left:0,
		top:0,
		height:'100%',
		width:'100%',
		zIndex:1,
		elevation:1,
	},
	pickerBar:{
		flexDirection:'row',
		alignItems:'baseline',
		justifyContent:'center',
		alignContent:'center',
		padding:5,
	},
	icoContainer:{
		alignSelf:'flex-end'	
	},
	dropMenuContainer:{
		position:'absolute',
		backgroundColor:'white',
		borderWidth:1,
		borderRadius:10,
		padding:5,
		zIndex:5,
		elevation:5
	},
	pickerItem:{
		borderBottomWidth:1,
		padding:5,
		justifyContent:'center',
		alignItems:'center',
	},
	text:{
		alignSelf:'flex-end',
	},
})


*/