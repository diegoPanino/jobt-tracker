import React,{useState} from 'react'
import {SafeAreaView,View,Text,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import MyPicker from '../components/MyPicker.js'
import JobSchedule from '../components/JobSchedule.js'

function ResumeScreen({jobs,navigation}){
	const [selectedJob,setSelectedJob] = useState(null)
	const jobList=Object.keys(jobs)
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.mainView}>
				<View style = {styles.pickerContainer}>
					<MyPicker containerStyle = {styles.pickerStyle} pickerItemStyle={styles.pickerItemStyle} textStyle={styles.pickerText} 
							values = {jobList} onValueChange = {(val)=>setSelectedJob(val)} selectValue = {jobList[0]} goTo={()=>navigation.navigate('Job')} />
				</View>
				<View style={styles.scheduleView}>
					<JobSchedule selectedJob = {selectedJob} jobs = {jobs} />
				</View>
			</View>
		</SafeAreaView>
		)
}
const mapStateToProps = state => ({
	jobs:state.jobs,
})
export default connect(mapStateToProps)(ResumeScreen)

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
	scheduleView:{
		flex:5
	},
})