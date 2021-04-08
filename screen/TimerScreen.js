import React,{useState,useEffect,useRef} from 'react'
import {SafeAreaView,View,StyleSheet, AppState} from 'react-native'
import {connect} from 'react-redux'
import {addEntryAction,isRunningAction,isNotRunningAction,pauseAction,setStateAction} from '../redux/action.js'
import Timer from '../components/Timer.js'
import TimerButtons from '../components/TimerButtons.js'
import MyPicker from '../components/MyPicker.js'
import MyText from '../components/MyText.js'

function TimerScreen({jobs,background,addEntryAction,isRunningAction,isNotRunningAction,pauseAction,navigation}){
	const [timerState,setTimerState] = useState('stop')
	const [selectedJob,setSelectedJob] = useState(null)
	const prevJob = usePrevious(selectedJob)
	const [playTime,setPlayTime] = useState(0)
	const appStateRef = useRef(AppState.currentState)
	const [appState,setAppState] = useState(appStateRef.current)
	const jobList=Object.keys(jobs)

	useEffect(()=>{
		return ()=>{
			setStateAction(timerState)
		}
	},[])

//event run on the first render and on unmount adding, and removing listener for app state
	useEffect(()=>{
		AppState.addEventListener('change',appStateHandler)
		return ()=> {
			AppState.removeEventListener('change',appStateHandler)
		}
	},[])
	const appStateHandler = nextAppState =>{
		if(appStateRef.current === 'active' && nextAppState.match(/inactive|background/))
			setTimerState('background')
		if(appStateRef.current.match(/inactive|background/) && nextAppState === 'active'){
			setTimerState('restore')
			setPlayTime(background.startTime)
		}
		appStateRef.current = nextAppState;
    	setAppState(appStateRef.current);
	}

//usePrevious store the prev val of a value using ref hooks
	function usePrevious(value) {
 		const ref = useRef()
  		useEffect(() => {
    		ref.current = value
  		});
  	return ref.current
	}
//anytime selectedJob change, stop the timer, if it's a first render check with prevJob and selectedJob to skip a stop while timer is in restore mod
	useEffect(()=>{
		if(prevJob !== selectedJob && prevJob !== null){
			setTimerState('stop')
		}
	},[selectedJob])
//anytime the flag isRunning change and is true, set the timerState to restore
	useEffect(()=>{
		if(background.isRunning && !(timerState === 'play')){
			setTimerState('restore')
			setPlayTime(background.startTime)
		}
	},[background.isRunning])

	useEffect(()=>  {
		if(timerState === 'play')
			isRunningAction(playTime)			
	},[playTime])
//saveTime is call when stop is press and create the entry obj for the store
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
	/*	addEntryAction(entry0)
		addEntryAction(entry1)
		addEntryAction(entry2)
		addEntryAction(entry3)
		addEntryAction(entry4)
		addEntryAction(entry5)
		addEntryAction(entry6)
		addEntryAction(entry7)
		addEntryAction(entry)
		addEntryAction(entry8)*/
	}
	const setStartTime = time => {
		setPlayTime(time)
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

	const onStop = () =>{
		setTimerState('stop')
		isNotRunningAction()
	}
	const onPause = () =>{
		setTimerState('pause')
	}
	const onPlay = () =>{
		setTimerState('play')
	}
	
	return (
		<SafeAreaView style = {styles.safeArea}>
			<View style = {styles.mainView}>
				<View style = {styles.pickerContainer}>
					<MyPicker containerStyle = {styles.pickerStyle} pickerItemStyle={styles.pickerItemStyle} textStyle={styles.pickerText} 
							values = {jobList} onValueChange = {(val)=>setSelectedJob(val)} selectValue = {jobList[0]} goTo={()=>navigation.navigate('Job')} />
				</View>
				<View style = {styles.timerContainer}>
					<Timer action={timerState} save = {time=>saveTime(time)} entryTimeCreation = {setStartTime}
							 restore = {background} playAction = {isRunningAction} pauseAction = {pauseAction}/>
				</View>
				{ jobList.length ? <TimerButtons state={timerState} background = {background} play={onPlay}
							  stop={onStop} pause={onPause}/>
							  : null
				}
			</View>
		</SafeAreaView>
		)
}
const mapStateToProps = state => ({
	jobs: state.jobs,
	background: state.background,
})
export default connect(mapStateToProps,{addEntryAction,isRunningAction,isNotRunningAction,pauseAction,setStateAction})(TimerScreen)

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
