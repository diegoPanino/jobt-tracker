import React,{useState} from 'react'
import {SafeAreaView,View,StyleSheet,TextInput,Alert,ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {addJobAction,deleteJobAction} from '../redux/action.js'
import MyButton from '../components/MyButton.js'
import MyText from '../components/MyText.js'
import JobRow from '../components/JobRow.js'

function JobsScreen({jobs,addJobAction,deleteJobAction}){
	const [jobName,setJobName] = useState()
	const [hourlyPaid,setHourlyPaid] = useState()
	const [pressable,setPressable] = useState(true)

	const pressedStyle = pressed =>[{
		backgroundColor:pressed ? '#f26430' : 'transparent'
	},styles.btn]

	const addJob = () =>{
		setPressable(false)
		if(!(jobName && hourlyPaid)){
			Alert.alert(
				'Info missing',
				'Both field are mandatory',
				[{text:'OK',onPress:()=>setPressable(true)}],
				{cancellable:false}
			)
		}
		else{
			const newJob = {[jobName]:{paid:hourlyPaid,entry:{}}}
			addJobAction(newJob)
			setJobName()
			setHourlyPaid()
			setPressable(true)
		}
	}
	const deleteJob = job =>{
		deleteJobAction(job)
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.mainView}>
				<View style={styles.jobForm}>
					<TextInput style={styles.input} placeholder='Job name' placeholderTextColor='white'
						 onChangeText={(t)=>setJobName(t)} value={jobName} />
					<TextInput style={styles.input} placeholder='Hourly paid' placeholderTextColor='white'
						 onChangeText={(t)=>setHourlyPaid(t)} value={hourlyPaid}
						keyboardType='number-pad' />
					<MyButton style={({pressed})=>pressedStyle(pressed)} press={addJob} disabled={!pressable}>
						<MyText style={styles.btnText}>ADD JOB</MyText>
					</MyButton>
				</View>
				<View style={styles.listContainer}>
					<ScrollView style={styles.list}>
						{Object.keys(jobs).map((job,i)=> { return( <JobRow key={i} jobName={job} jobDel = {(j)=>deleteJob(j)} /> )} ) }
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
		)
}
const mapStateToProps = state => ({
	jobs:state.jobs
})
export default connect(mapStateToProps,{addJobAction,deleteJobAction})(JobsScreen)

const styles = StyleSheet.create({
	safeArea:{
		flex:1,
		backgroundColor:'#2a2d34'
	},
	mainView:{
		flex:1,
		marginTop:'5%',
		justifyContent:'flex-start',
		alignItems:'center',
	},
	jobForm:{
		minHeight:'25%',
		width:'80%',
		justifyContent:'center',
		alignItems:'center',
		borderWidth:3,
		borderColor:'#6761a8',
		borderRadius:5,
	},
	listContainer:{
		maxHeight:'65%',
		width:'80%',
		margin:'2.5%',
	},
	input:{
		color:'white',
		width:'90%',
		textAlign:'center',
		margin:20,
		paddingBottom:0,
		borderBottomWidth:1,
		borderColor:'#6761a8',
	},
	btn:{
		paddingRight:5,
		paddingLeft:5,
	},
	btnText:{
		textAlign:'center',
	},
	list:{
		borderWidth:3,
		borderColor:'#6761a8',
		borderRadius:5,

	}
})