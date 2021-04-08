import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'

export default function Timer(props){
	const {save,entryTimeCreation,restore,pauseAction,playAction} = props
	const [startTime,setStartTime] = useState( restore.startTime || 0)
	const [stopTime,setStopTime] = useState(0)
	const [totalTime,setTotalTime] = useState(restore.totalTime || 0)
	const [s,setS] = useState(0)
	const [m,setM] = useState(0)
	const [h,setH] = useState(0)
	const [isPaused,setIsPaused] = useState(restore.pausedd || false)
	const [isStopped,setIsStopped] = useState(false)
	const [intervalID,setIntervalID] = useState(null)
	const firstRender = useRef(true)

	useEffect(()=>{
		return () =>{
			if(intervalID)
				clearInterval(intervalID)
		}
	},[])
//effect responding to the timer commands
//on 'PLAY' save the current press time and start the interval, storing the id into the state
//on 'STOP' switch the isStopped state to true and activate the effect, is the only one that can switch to true
//on 'PAUSE' set isPaused and isStopped, clear the interval and set the stopTime activating the effect without calling store update
	useEffect(()=>{
		if(props.action === 'restore'){
			setIsPaused(false)
			setIsStopped(false)
			let elapsedTime
			if(restore.paused){
				elapsedTime = Number(restore.totalTime)
			}
			else{
				elapsedTime = Number(new Date(Date.now())) - Number(startTime) + Number(restore.totalTime)
			}
			const seconds = Math.floor((elapsedTime / 1000) % 60);
  			const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
  			const hours = Math.floor((elapsedTime  / 1000 / 3600 ) % 24)
  			setS(seconds)
  			setM(minutes)
  			setH(hours)
  			if(!restore.paused){
  				if(intervalID)
  					clearInterval(intervalID)
  				const id = setInterval(()=>{
  				setS(prevS => prevS + 1)
  				},1000)
  				setIntervalID(id)	
  			}
  			else{
  				setIsPaused(true)
  				setIsStopped(false)
  			}

		}
		if(!firstRender.current){
			switch(props.action){
				case 'play': {
					const timeNow = Date.now()
					if(!isPaused){
						entryTimeCreation(timeNow)
					}
					else{
						playAction(timeNow)
					}
					setIsPaused(false)
					setIsStopped(false)
					setStartTime(timeNow)
					const id = setInterval(()=>{
						setS(prevS => prevS + 1)
					},1000)
					setIntervalID(id)
					break
				}
				case 'stop':{
					setIsStopped(true)
					break
				}
				case 'pause':{
					setIsPaused(true)
					setIsStopped(false)
					setStopTime(Date.now())
					clearInterval(intervalID)
					break;
				}
			}
		}
	},[props.action])

//when stopTime change and > 0 (to skip first render) set the totalTime using startTime
	useEffect(()=>{
		if(stopTime > 0){
			const totTime = (stopTime - startTime) + totalTime
			setTotalTime(totTime)
		}
	},[stopTime])
//when totalTime change and is > 0 (to skip first render) run saveTime()
	useEffect(()=>{
		if(totalTime>0){
			saveTime()
		}
	},[totalTime])
	useEffect(()=>{
		if(props.action === 'pause' && !firstRender.current)
			pauseAction(totalTime)
	},[totalTime])
//when isStopped is set to true, activate the 'STOP' logic
//clear the interval, set timer to 00:00:00
//if 'STOP' is press with the timer running, set the new stopTime and activate the effect
//if 'STOP' is press with the timer paused, run directly the saveTime() without update the stopTime
	useEffect(()=>{
		if(isStopped){
			clearInterval(intervalID)
			setS(0)
			setM(0)
			setH(0)
			if(!isPaused){
				setStopTime(Date.now())
			}
			else{
				saveTime()		
			}
			setIsPaused(false)	
		}
	},[isStopped])
//for every seconds update, check is already a minute time and update
	useEffect(()=>{
		if(s === 59){
			setS(0)
			setM(prevM=>prevM+1)
		}
	},[s])
//for every minutes update, check if it is already an hour and update
	useEffect(()=>{
		if(m > 59){
			setM(0)
			setH(prevH=>prevH+1)
		}
	},[m])
//create an entry obj for the store, with the total time in ms and with the current date formatted
	const saveTime = () =>{
		if(isStopped){
			save(totalTime)
			setTotalTime(0)
		}
	}
// Effect top skip the first render and having dirty var
	useEffect(()=>{
		if(firstRender.current)
			firstRender.current = false
	},[])
	return (
		<View style={styles.mainView}>
			<MyText style={styles.timerText}>
				{h<10 ? '0'+h : h}:
				{m<10 ? '0'+m : m}:
				{s<10 ? '0'+s : s}
			</MyText>
		</View>
		)
}
const styles=StyleSheet.create({
	mainView:{
		flex:2,
		justifyContent:'center',
	},
	timerText:{
		fontSize:80,
	}
})