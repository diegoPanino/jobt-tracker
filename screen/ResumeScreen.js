import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,StyleSheet,Pressable,ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import {BlurView} from "@react-native-community/blur"
import {addEntryAction,isRunningAction} from '../redux/action.js'
import MyPicker from '../components/MyPicker.js'
import JobSchedule from '../components/JobSchedule.js'
import AddNewEntry from '../components/AddNewEntry.js'

function ResumeScreen({jobs,background,isRunningAction,addEntryAction,navigation}){
	const [selectedJob,setSelectedJob] = useState(null)
	const [showNewEntry,setShowNewEntry] = useState(false)
	const [loaded,setLoaded] = useState(false)
	const jobList=Object.keys(jobs)

	useEffect(()=>{
		if(jobs)
			setLoaded(true)
		else
			setLoaded(false)
	},[jobs])

	onSaveEntry = data =>{
		const {date,day,start,end,hours,isPaid} = data
		const update = jobs[selectedJob].entry.hasOwnProperty(data.key)
		const entry = {job:selectedJob,date,day,start,end,hours,isPaid}
		addEntryAction(entry)
	}
	if(!loaded){
		return (<SafeAreaView style={styles.safeArea}>
					<View style={styles.mainView}>
						<ActivityIndicator size="large" color="#009DDC" />
					</View>
				</SafeAreaView>
				)
	}
	else{
	return (
		<SafeAreaView style={styles.safeArea}>
			
			<View style={styles.mainView}>
				<View style = {styles.pickerContainer}>
					<MyPicker containerStyle = {styles.pickerStyle} pickerItemStyle={styles.pickerItemStyle} textStyle={styles.pickerText} 
							values = {jobList} onValueChange = {(val)=>setSelectedJob(val)} selectValue = {jobList[0]} goTo={()=>navigation.navigate('Job')} />
				</View>
				{(jobs && selectedJob) &&
				<View style={styles.scheduleView}>
					<JobSchedule selectedJob = {selectedJob} jobs = {jobs} />
				</View>	
				}
				<View style = {styles.btnContainer}>
					<Pressable onPress = {()=>setShowNewEntry(true)}>
						<Icon name = 'add-circle-outline' size = {50} color='#6761a8' />
					</Pressable>
				</View>
				{(showNewEntry) &&
					<>
					<BlurView style={styles.absolute}
         				 blurType="light" blurAmount={5} />
					<AddNewEntry hide = {()=>{setShowNewEntry(false)}} save = {(entry)=>onSaveEntry(entry)} 
								 background = {background} selectedJob = {selectedJob} action = {isRunningAction}/>
					</>
				}
			</View>
		</SafeAreaView>
		)}
}
const mapStateToProps = state => ({
	jobs:state.jobs,
	background: state.background
})
export default connect(mapStateToProps,{addEntryAction,isRunningAction})(ResumeScreen)

const styles = StyleSheet.create({
	safeArea:{
		flex:1,
		backgroundColor:'#2a2d34'
	},
	mainView:{
		flex:1,
		marginTop:'5%',
		marginBottom:'2.5%',
		justifyContent:'center',
		alignItems:'center',
	},
	pickerContainer:{
		marginBottom:'2.5%',
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
	scheduleView:{
		flex:5,
		width:'100%',
	},
	btnContainer:{
		position:'absolute',
		bottom:0,
		left:40,
	},
	absolute:{
		position:'absolute',
		top:0,
		bottom:0,
		right:0,
		left:0,
	}
})