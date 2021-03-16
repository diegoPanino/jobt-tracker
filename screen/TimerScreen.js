import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {addEntryAction} from '../redux/action.js'
import Timer from '../components/Timer.js'
import TimerButtons from '../components/TimerButtons.js'
import MyPicker from '../components/MyPicker.js'
import MyText from '../components/MyText.js'

function TimerScreen({jobs,addEntryAction,navigation}){
	const [timerState,setTimerState] = useState('stop')
	const [selectedJob,setSelectedJob] = useState(null)
	const [playTime,setPlayTime] = useState(0)
	const jobList=Object.keys(jobs)
	
	useEffect(()=>{
		setTimerState('stop')
	},[selectedJob])

	

	const saveTime = time =>{
		const hours = fromMsToH(time)
		const options = {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}
		const endTime = new Date(Date.now()).toLocaleString()
		const startTime = new Date(playTime).toLocaleString()
		const date = startTime.split(',')
		const dayTemp = new Date(playTime).toLocaleDateString('en-GB',options).split(' ') 
		const day = dayTemp[0]+' '+dayTemp[1]
		const startTemp = startTime.split(' ')
		const startTemp2 = startTemp[1].split(':')
		const start = startTemp2[0]+':'+startTemp2[1]
		const endTemp = endTime.split(' ')
		const endTemp2 = endTemp[1].split(':')
		const end = endTemp2[0]+':'+endTemp2[1]
		const _1monthAgoStart = new Date(Date.now() - 2592000000).toLocaleString()
		const _1monthAgoEnd = new Date(Date.now() - 2591900000).toLocaleString()
		const _1month1DayAgoStart = new Date(Date.now()- 2592000000 - 86400000 ).toLocaleString()
		const _1month1DayAgoEnd = new Date(Date.now()- 2591900000 - 86390000 ).toLocaleString()
		const _1dayAgoStart = new Date(Date.now() - 86400000).toLocaleString()
		const _1dayAgoEnd = new Date(Date.now() - 86390000).toLocaleString()
		const entry = {job:selectedJob,date:date[0],day,start,end,hours}
		const yesterday = {job:selectedJob,date:'14/3/2021',day:'Sun, 14',start:'08:00',end:'16:00',hours:fromMsToH(2.88e+7)}
		const monthAgo = {job:selectedJob,date:'15/2/2021',day:'Mon, 15',start:'08:00',end:'16:00',hours:fromMsToH(2.88e+7)}
		const monthDayAgo = {job:selectedJob,date:'14/2/2021',day:'Sun, 14',start:'08:00',end:'16:00',hours:fromMsToH(2.88e+7)}
		/*addEntryAction(entry)*/
		addEntryAction(yesterday)
		addEntryAction(monthAgo)
		addEntryAction(monthDayAgo)
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
					<Timer action={timerState} save = {time=>saveTime(time)} entryTimeCreation = {(time)=>setPlayTime(time)} />
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
	jobs: state.jobs
})
export default connect(mapStateToProps,{addEntryAction})(TimerScreen)

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