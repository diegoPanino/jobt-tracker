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
		const endTime = new Date(Date.now()).toLocaleString()
		const startTime = new Date(playTime).toLocaleString()
		const entry = {job:selectedJob,startTime,endTime,hours:time}
		addEntryAction(entry)
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