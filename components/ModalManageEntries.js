import React,{useState,useRef,useEffect} from 'react'
import {View,StyleSheet,Pressable, Animated,Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import {toggleIsPaidAction,deleteDatesAction} from '../redux/action.js'
import MyText from './MyText.js'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGTH = Dimensions.get('window').height

function  ModalManageEntries(props){
	const {job,selection,toggleSelection,toggleIsPaidAction,deleteDatesAction,resumePage} = props
	const [deleteConfirm,setDeleteConfirm] = useState(false)
	const fade = useRef(new Animated.Value(1)).current

	useEffect(()=>{
		Animated.timing(fade,{
			toValue:1,
			duration:200,
			useNativeDriver:false
		}).start()
	},[deleteConfirm])

	const toggleIsPaid = () =>{
		toggleIsPaidAction({job,selection})
	}
	const toggleMenu = () =>{
		Animated.timing(fade,{
			toValue:0,			
			duration:200,
			useNativeDriver:false,
		}).start(finished => setDeleteConfirm(prevState => !prevState))
	}
	const deleteSelection = () =>{
		deleteDatesAction({dates:selection,job:job})
		toggleSelection()
	}
	const toggleResume = () =>{
		resumePage()
	}

	return (
		<View style = {styles.mainView}>
			{!deleteConfirm &&
				<Animated.View style = {{opacity:fade}}>
					<View style = {styles.counter}>
						<MyText style = {styles.textCounter}>{selection.length} selected</MyText>
						<Pressable style = {styles.closeBtn} onPress = {()=>toggleSelection()}>
							<Icon name = 'close' size = {15}  color = '#009ddc' />
						</Pressable>
					</View>
					<View style = {styles.iconsRow}>
						<View style = {styles.icoContainer}>
							<Pressable onPress={toggleIsPaid} >
								<Icon name = 'logo-usd' size = {50} color = '#009ddc' />				
								<MyText style = {styles.textCounter}>paid/unpaid</MyText>
							</Pressable>
						</View>
						<View style = {[styles.icoContainer,styles.centerContainer]}>
							<Pressable onPress = {toggleResume} >
								<Icon name = 'clipboard-outline' size = {50} color = '#009ddc' />
								<MyText style = {styles.textCounter}>resume</MyText>
							</Pressable>
						</View>
						<View style = {styles.icoContainer}>
							<Pressable onPress = {toggleMenu}>
								<Icon name = 'trash-outline' size = {50} color = '#009ddc' />
								<MyText style = {styles.textCounter}>delete</MyText>
							</Pressable>
						</View>
					</View>	
				</Animated.View>
			}
			{deleteConfirm && 
				<Animated.View style = {{opacity:fade}}>
					<View style = {styles.deleteBox}>
						<View style = {styles.deleteTextView}>
							<MyText style = {styles.deleteText}>
								ARE YOU SURE TO ELIMINATE THE SELECTION?
							</MyText>
						</View>
						<View style = {styles.deleteBtnView}>
							<Pressable style = {styles.btn} onPress = {deleteSelection}>
								<MyText>YES</MyText>
								<Icon name='checkmark' size={40} color = '#009B72'/>
							</Pressable>
							<Pressable style = {styles.btn} onPress = {toggleMenu}>
								<MyText>NO</MyText>
								<Icon name='close' size={40} color = '#F26430'/>
							</Pressable>
						</View>
					</View>
				</Animated.View>
			}
		</View>
		)
}
export default connect(null,{toggleIsPaidAction,deleteDatesAction})(ModalManageEntries)

const styles = StyleSheet.create({
	mainView:{
		height:'100%',
	},
	counter:{
		flex:0.5,
		width:'98%',
		justifyContent:'flex-end',
		flexDirection:'row',
	},
	textCounter:{
		alignSelf:'center',
		fontSize:12,
		marginRight:5,
	},
	closeBtn:{
		alignSelf:'center',
		paddingRight:10,
		paddingLeft:10,
		borderWidth:1,
		borderColor:'#009ddc',
		borderRadius:40,
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
	},
	deleteBox:{
		flex:1,
		margin:10,
	},
	deleteTextView:{
		flex:2,
	},
	deleteText:{
		fontSize:15,
		textAlign:'center',
	},
	deleteBtnView:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	btn:{
		flexDirection:'row',
		alignItems:'center'
	}
})