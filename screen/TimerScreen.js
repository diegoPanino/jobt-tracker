import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {addEntryAction,isRunningAction,isNotRunningAction} from '../redux/action.js'
import Timer from '../components/Timer.js'
import TimerButtons from '../components/TimerButtons.js'
import MyPicker from '../components/MyPicker.js'
import MyText from '../components/MyText.js'

function TimerScreen({jobs,background,addEntryAction,isRunningAction,isNotRunningAction,navigation}){
	const [timerState,setTimerState] = useState('stop')
	const [selectedJob,setSelectedJob] = useState(null)
	const [playTime,setPlayTime] = useState(0)
	const jobList=Object.keys(jobs)
	
/*	useEffect(()=>{
		console.log('effect')
		if(background.isRunning){
			console.log('isRunning')  				//effect to work in background
			setTimerState('play')
			setPlayTime(background.startTime)
		}
		return ()=>console.log('closeApp')
	},[])*/

	useEffect(()=>{
		setTimerState('stop')
	},[selectedJob])

	const saveTime = time =>{
		const hours = fromMsToH(time)
		const endTime = new Date(Date.now()).toString().split(' ') //new date with form WWW_MMM_DD_YYYY_HH:MM:SS_GMT etc etc
		const newDate = new Date(playTime)
		const startTime = newDate.toString().split(' ')
		const MMtemp = newDate.getMonth() + 1
		const mm = MMtemp < 10 ? '0' + MMtemp : MMtemp.toString() 
		const day = startTime[0]+','+startTime[2]
		const date = startTime[2] + '/'+ mm + '/' + startTime[3]
		const start = startTime[4].slice(0,-3)
		const end = endTime[4].slice(0,-3)
		const entry0 = {job:selectedJob,date:'01/01/2021',day:'Mon,01',start:'08:00',end:'18:00',hours:'02:00',isPaid:false}
		const entry1 = {job:selectedJob,date:'02/02/2021',day:'Tue,02',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry2 = {job:selectedJob,date:'03/02/2021',day:'Wed,03',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry3 = {job:selectedJob,date:'15/02/2021',day:'Thu,15',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry4 = {job:selectedJob,date:'27/02/2021',day:'Fri,27',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry5 = {job:selectedJob,date:'01/03/2021',day:'Sat,01',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry6 = {job:selectedJob,date:'02/03/2021',day:'Sun,02',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry7 = {job:selectedJob,date:'05/03/2021',day:'Mon,05',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry8 = {job:selectedJob,date:'01/10/2021',day:'Tue,01',start:'08:10',end:'14:00',hours:'02:00',isPaid:false}
		const entry = {job:selectedJob,date,day,start,end,hours,isPaid:false}
		addEntryAction(entry0)
		addEntryAction(entry1)
		addEntryAction(entry2)
		addEntryAction(entry3)
		addEntryAction(entry4)
		addEntryAction(entry5)
		addEntryAction(entry6)
		addEntryAction(entry7)
		addEntryAction(entry)
		addEntryAction(entry8)
	}
	const setStartTime = time => {
		setPlayTime(time)
		isRunningAction(time)
	}
	const fromMsToH = millisec =>{
 		const ms = parseInt((millisec % 1000) / 100)
	    let seconds = Math.floor((millisec / 1000) % 60)
	    let minutes = Math.floor((millisec / (1000 * 60)) % 60)
	    let hours = Math.floor((millisec / (1000 * 60 * 60)) % 24)

	    if(seconds > 30)
	    	minutes = minutes + 1
	    if(minutes > 52)
	    	hours = hours + 1

		minutes= (((minutes + 7.5)/15 | 0) * 15) % 60
		hours = ((((minutes/105) + .5) | 0) + hours) % 24

		hours = (hours < 10) ? '0' + hours : hours
		minutes = (minutes < 10) ? "0" + minutes : minutes

	  	return hours + ':' + minutes
	}
	
	return (
		<SafeAreaView style = {styles.safeArea}>
			<View style = {styles.mainView}>
				<View style = {styles.pickerContainer}>
					<MyPicker containerStyle = {styles.pickerStyle} pickerItemStyle={styles.pickerItemStyle} textStyle={styles.pickerText} 
							values = {jobList} onValueChange = {(val)=>setSelectedJob(val)} selectValue = {jobList[0]} goTo={()=>navigation.navigate('Job')} />
				</View>
				<View style = {styles.timerContainer}>
					<Timer action={timerState} save = {time=>saveTime(time)} entryTimeCreation = {setStartTime} />
				</View>
				{ jobList.length ? <TimerButtons state={timerState} play={()=>setTimerState('play')}
							  stop={()=>setTimerState('stop')} pause={()=>setTimerState('pause')}/>
							  : null
				}
			</View>
		</SafeAreaView>
		)
}
const mapStateToProps = state => ({
	jobs: state.jobs,
	background: state.background
})
export default connect(mapStateToProps,{addEntryAction,isRunningAction,isNotRunningAction})(TimerScreen)

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
	},
	pickerContainer:{
		flex:1,
		width:'80%',
		alignItems:'center',
	},
	pickerStyle:{
		padding:15,
		borderColor:'#6761a8',
		borderWidth:2,
		borderRadius:10,
		backgroundColor:'#009ddc'
	},
	pickerText:{
		color:'white',
	},
	pickerItemStyle:{
		borderTopWidth:0,
		backgroundColor:'#009ddcaa',
		borderWidth:2,
		borderColor:'#6761a8',
	},
	timerContainer:{
		flex:3,
	},
})


/*
<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {pause} >
						{((timerState !== 'pause') && (timerState === 'play')) && 
							<Icon name = 'pause' size = {100} />}
					</Pressable>
*/