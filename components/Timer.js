import React,{useState,useEffect,useRef} from 'react'
import {View,StyleSheet} from 'react-native'
import MyText from './MyText.js'

export default function Timer(props){
	const [startTime,setStartTime] = useState(0)
	const [stopTime,setStopTime] = useState(0)
	const [totalTime,setTotalTime] = useState(0)
	const [s,setS] = useState(0)
	const [m,setM] = useState(0)
	const [h,setH] = useState(0)
	const [isPaused,setIsPaused] = useState(false)
	const [intervalID,setIntervalID] = useState(null)
	const firstRender = useRef(true)

	useEffect(()=>{
		if(stopTime > 0){
			const totTime = (stopTime - startTime) + totalTime
			setTotalTime(totTime)
		}
	},[stopTime])
	useEffect(()=>{
		if(totalTime>0)
			saveTime()
	},[totalTime])

	useEffect(()=>{
		if(!firstRender.current){
			switch(props.action){
				case 'play': {
					setIsPaused(false)
					setStartTime(Date.now())
					const id = setInterval(()=>{
						setS(prevS => prevS + 1)
					},1000)
					setIntervalID(id)
					break
				}
				case 'stop':{
					setIsPaused(false)
					clearInterval(intervalID)
					setS(0)
					setM(0)
					setH(0)
					if(!isPaused){
						setStopTime(Date.now())
					}
					else{
						setIsPaused(false)		
					}
					break
				}
				case 'pause':{
					setIsPaused(true)
					setStopTime(Date.now())
					clearInterval(intervalID)
					break;
				}
			}
		}
	},[props.action])
	useEffect(()=>{
		if(s === 59){
			setS(0)
			setM(prevM=>prevM+1)
		}
	},[s])
	useEffect(()=>{
		if(m > 59){
			setM(0)
			setH(prevH=>prevH+1)
		}
	},[m])


//create an entry obj for the store, with the total time in ms and with the current date
	const saveTime = () =>{
		if(!isPaused){
			console.log('Time timed: ',totalTime/1000)
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