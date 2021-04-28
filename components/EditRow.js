import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,Pressable} from 'react-native'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyText from './MyText.js'

export default function EditRow(props){
	const {date,item,i,showSaveBtn} = props
	const splitDate = date.split('/')
	const selectDay = {years:splitDate[2],months:splitDate[1]-1,days:splitDate[0]}
	const splitStart = item.start.split(':')
	const splitEnd = item.end.split(':')
	const INITIAL_START_TIME = new Date(moment({...selectDay,hours:splitStart[0],minutes:splitStart[1]}).format())
	const INITIAL_END_TIME = new Date(moment({...selectDay,hours:splitEnd[0],minutes:splitEnd[1]}).format())
	const [start,setStart] = useState(INITIAL_START_TIME)
	const [end,setEnd] = useState(INITIAL_END_TIME)
	const [showStart,setShowStart] = useState(false)
	const [showEnd,setShowEnd] = useState(false)
	const firstRender = useRef(true)

	useEffect(()=>{
		if(firstRender.current)
			firstRender.current = false
	},[])

	useEffect(()=>{
		if( (start.toString() != INITIAL_START_TIME.toString() || end.toString() != INITIAL_END_TIME.toString())){
			showSaveBtn({start,end,i})
		}
	},[start,end])

	const openStartClock = () =>{
		setShowStart(true)
	}
	const openEndClock = () =>{
		setShowEnd(true)
	}
	const onStartChange = e =>{
		setShowStart(false)
		const {timestamp} = e.nativeEvent
		if(e.type === 'set'){
			setStart(timestamp)
		}
	}
	const onEndChange = e =>{
		setShowEnd(false)
		const {timestamp} = e.nativeEvent
		if(e.type === 'set'){
			setEnd(timestamp)
		}
	}
	return(
		<View style = {styles.mainView} key = {item.day+item.start+item.end}>
			<View style = {styles.start}>
				<Pressable onPress={openStartClock}>
					<MyText>{moment(start).format('HH:mm')}
						<Icon name = 'pencil' color = '#009DDC' size = {18} />
					</MyText>		
				</Pressable>
				{showStart && <DateTimePicker mode = 'time' value = {start} onChange = {(e)=>onStartChange(e)} is24h = {true} />}
			</View>
			<View style = {styles.end}>
				<Pressable onPress={openEndClock}>
					<MyText>{moment(end).format('HH:mm')}
						<Icon name = 'pencil' color = '#009DDC' size = {18} />
					</MyText>	
				</Pressable>
				{showEnd && <DateTimePicker mode = 'time' value = {end} onChange = {(e)=>onEndChange(e)} is24h = {true} />}
			</View>
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		flexDirection:'row',
		justifyContent:'space-evenly',
	},
	start:{
		flexDirection:'row',
		padding:20,
		borderLeftWidth:1,
		borderColor:'#6761A8'
	},
	end:{
		flexDirection:'row',
		padding:20,
		borderRightWidth:1,
		borderColor:'#6761A8'
	},
	headText:{
		fontSize:10,
	}
})