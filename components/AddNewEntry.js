import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet,Pressable,Animated,Alert} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import moment from 'moment'
import MyText from './MyText.js'
import MyPicker from './MyPicker.js'
import {subH} from '../utility/Utility.js'

export default function AddNewEntry({hide,save,background,action,selectedJob}){
	const today = new Date(Date.now())
	const [date,setDate] = useState(null)
	const [start,setStart] = useState(today)
	const [finish,setFinish] = useState(today)
	const [updateStart,setUpdateStart] = useState(false)
	const [updateFinish,setUpdateFinish] = useState(false)
	const [showPickers,setShowPickers] = useState(false)
	const [showStartPicker,setShowStartPicker] = useState(false)
	const [showFinishPicker,setShowFinishPicker] = useState(false)
	const [showBtn,setShowBtn] = useState(false)
	const [showSave,setShowSave] = useState(false)
	const [showStart,setShowStart] = useState(false)
	const fade = useRef(new Animated.Value(0)).current
	const fadeSave = useRef(new Animated.Value(0)).current
	
	function usePrevious(value) {
  		const ref = useRef();
	  	useEffect(() => {
    		ref.current = value;
  		});
  		return ref.current;
	}

	useEffect(()=>{
		if(date){
			setShowPickers(true)
			Animated.timing(fade,{
				toValue:1,
				duration:650,
				useNativeDriver:true
			}).start()
		}
	},[date])

	useEffect(()=>{
		if(date && updateStart){
			setShowBtn(true)
			Animated.timing(fadeSave,{
				toValue:1,
				duration:650,
				useNativeDriver:true
			}).start()
		}
	},[date,updateStart,updateFinish])

	const onDateChangeHandler = date =>{
		const momentJs = moment(date).format('DD/MM/YYYY')
		setDate(momentJs)
	}
	const onStartChangeHandler = e =>{
		setShowStartPicker(false)
		if(e.type === 'set'){
			setStart(e.nativeEvent.timestamp)
			setUpdateStart(true)
			setShowStart(true)
		}
	}
	const onFinishChangeHandler = e =>{
		setShowFinishPicker(false)
		if(e.type === 'set'){
			setFinish(e.nativeEvent.timestamp)
			setUpdateFinish(true)
			setShowStart(false)
			setShowSave(true)
		}
	}
	const saveEntry = () =>{
		const formatStart = moment(start).format('HH:mm')
		const formatFinish = moment(finish).format('HH:mm')
		const dayTmp = moment(date,'DD/MM/YYYY').toString().split(' ')
		const day = dayTmp[0]+','+dayTmp[2]
		const hours = subH(formatStart,formatFinish)
		save({date,day,start:formatStart,end:formatFinish,hours,isPaid:false})
		hide()
	}
	const startTimer = () =>{
		if(background.isRunning)
			Alert.alert(
				'Attention!',
				'I can\'t start the timer. It\'s already on!',
				)
		else if(moment(today,).format('DD/MM/YYYY') === date){
			Alert.alert(
				'Start timer',
				'The timer is set at '+moment(start).format('HH:mm')+' for the job:\n'+selectedJob+'?',
				[
					{text:'Cancel',style:'cancel'},
					{text:'START', onPress: confirmStartTimer}
				]
			)
		}
		else{
			Alert.alert(
				'Attention!',
				'Select the date of today to start the timer from here!',
				)
		}
	}

	const confirmStartTimer = () => {
		action(Number(moment(start).format('x')))
		hide()
	}

	const pressedStyle = pressed => [{
		backgroundColor: !pressed ? 'transparent' : '#009DDC',
	},styles.btnPres]
	return (
		<View style = {styles.mainView}>
			<View style = {styles.header}>
				<Pressable onPress = {hide}>
					<Icon name = 'close' size = {50} color = 'white' />
				</Pressable>
			</View>
			<View style = {styles.content}>
				<CalendarPicker textStyle = {styles.text} selectedDayColor = '#6761A8' scrollable = {true} dayLabelsWrapper = {styles.daysLaberWrap}
					todayBackgroundColor = 'transparent' todayTextStyle = {styles.text} onDateChange = {date => onDateChangeHandler(date)} startFromMonday = {true} />
				{showPickers && <Animated.View style = {{opacity:fade}}>
					<View style = {styles.pickerLine}>
						<View style = {styles.pickerBlock}>
							<Pressable onPress = {()=>setShowStartPicker(true)}>
								<MyText>{`Start:\t`}
								{updateStart ? 
									<MyText style = {{color:'#009DDC'}}> {moment(start).format('HH:mm') }</MyText>
									: <Icon name = 'time' size = {18} color = '#009DDC'/>}</MyText>
							</Pressable>
						{showStartPicker && <DateTimePicker mode = 'time' value = {start} onChange = {e=>onStartChangeHandler(e)} is24H = {true}/>}	
						</View>
						<View style = {styles.pickerBlock}>
							<Pressable onPress = {()=>setShowFinishPicker(true)}>
								<MyText>{`Finish:\t`}
								{updateFinish ?
									<MyText style = {{color:'#009DDC'}}> {moment(finish).format('HH:mm')}</MyText>
									: <Icon name = 'time' size = {18} color = '#009DDC'/>}</MyText>
							</Pressable>
						{showFinishPicker && <DateTimePicker mode = 'time' value = {finish} onChange = {e=>onFinishChangeHandler(e)}/>}		
						</View>
					</View>
				</Animated.View>}
				{
				showBtn && <Animated.View style = {{opacity:fadeSave}}>
					<View style = {styles.btnView}>
						{ showSave &&
						<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {saveEntry}>
							<View style = {styles.btnTextView}><MyText style = {styles.btnText}>Done</MyText></View>
							<View style = {styles.btnIcoView}><Icon name = 'checkmark' size = {40} color = '#009B72' /></View>
						</Pressable>
						}
						{ showStart &&
						<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {startTimer}>
							<View style = {styles.btnTextView}><MyText style = {styles.btnText}>Start</MyText></View>
							<View style = {styles.btnIcoView}><Icon name = 'play' size = {40} color = '#009ddc' /></View>
						</Pressable>
						}
					</View>
				</Animated.View>
				}
			</View>
			
		</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		backgroundColor:'#2A2D34',
		flex:1,
		position:'absolute',
		top:0,
		left:0,
	},
	header:{
		flex:1,
		alignSelf:'flex-end',
	},
	content:{
		flex:4,
	},
	text:{
		color:'white',
	},
	daysLaberWrap:{
		borderTopWidth:1,
		borderBottomWidth:1,
		borderColor:'#6761A8'
	},
	pickerLine:{
		flex:1,
		flexDirection:'row',
		justifyContent:'space-around',
		marginBottom:10,
		paddingTop:10,
		borderTopWidth:1,
		borderColor:'#6761A8',
	},
	pickerBlock:{
		borderWidth:1,
		borderColor:'#6761A8',
		padding:5,

	},
	textContainerTimer:{
		flex:1,

	},
	timePickerIco:{
		borderWidth:1,
		borderColor:'white'
	},
	btnView:{
		borderTopWidth:1,
		borderColor:'#6761A8',
		alignItems:'center',
		padding:5,
	},
	btnPres:{
		flexDirection:'row',
		alignItems:'center',
		borderWidth:1,
		borderColor:'#6761A8',
		padding:5,
		borderRadius:10,
	}
})