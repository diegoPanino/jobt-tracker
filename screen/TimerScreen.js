import React,{useState,useEffect,useRef} from 'react'
import {SafeAreaView,View,StyleSheet, AppState, Pressable} from 'react-native'
import {connect} from 'react-redux'
import {addEntryAction,isRunningAction,isNotRunningAction,pauseAction} from '../redux/action.js'
import Timer from '../components/Timer.js'
import TimerButtons from '../components/TimerButtons.js'
import MyPicker from '../components/MyPicker.js'
import MyText from '../components/MyText.js'
import {fromMsToH} from '../utility/Utility.js'

function TimerScreen(props){
	const {jobs,background} = props
	const {navigation} = props
	const {addEntryAction,isRunningAction,isNotRunningAction,pauseAction} = props 
	const [timerState,setTimerState] = useState('stop')
	const [update,setUpdate] = useState(false)
	const [selectedJob,setSelectedJob] = useState(null)
	const prevJob = usePrevious(selectedJob)
	const [playTime,setPlayTime] = useState(0)
	const appStateRef = useRef(AppState.currentState)
	const [appState,setAppState] = useState(appStateRef.current)
	const jobList=Object.keys(jobs)

//event run on everytime background.isRunnin/paused change so the scope stay update when running appStateHandler
	useEffect(()=>{
		AppState.addEventListener('change',appStateHandler)
		return ()=> {
			AppState.removeEventListener('change',appStateHandler)
		}
	},[background.isRunning,background.paused])
//when coming from background set the state to 'restore' and activate the effect in Timer.js
//if the timer is started from AddNewEntry.js. the state is already on 'restore', so there is not state update
//everytime coming from background the timer is showing the right time because playTime is set to background.startTime
//'update' state is used when timerState is already on 'restore'
//when going to background change the 'update' state
//to skip calls to isRunningAction and isPaused in the Timer.js effect, this state update is done only if timerState is not 'pause' or 'play'
	const appStateHandler = nextAppState =>{
		if(appStateRef.current.match(/inactive|background/) && nextAppState === 'active' && background.isRunning){
			setTimerState('restore')
			setPlayTime(background.startTime)
			if(!background.paused)
				setUpdate(true)		
		}
		else if(timerState !== 'pause' && timerState !== 'play')
			setUpdate(false)

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
		const entry = {job:selectedJob,date,day,start,end,hours,isPaid:false}
		addEntryAction(entry)
	}
	const setStartTime = time => {
		setPlayTime(time)
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
					<Timer action={timerState} update = {update} save = {time=>saveTime(time)} entryTimeCreation = {setStartTime}
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
export default connect(mapStateToProps,{addEntryAction,isRunningAction,isNotRunningAction,pauseAction})(TimerScreen)

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
