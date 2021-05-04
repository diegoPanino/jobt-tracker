import React,{useState,useRef} from 'react'
import {SafeAreaView,View,StyleSheet,TextInput,Alert,ScrollView,TouchableWithoutFeedback, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import {addJobAction,deleteJobAction} from '../redux/action.js'
import MyButton from '../components/MyButton.js'
import MyText from '../components/MyText.js'
import JobRow from '../components/JobRow.js'

function JobsScreen({jobs,addJobAction,deleteJobAction}){
	const [jobName,setJobName] = useState()
	const [hourlyPaid,setHourlyPaid] = useState()
	const [pressable,setPressable] = useState(true)
	const hourlyPaidRef = useRef(null)
	const jobNameRef = useRef(null)

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
			const newJob = {[jobName]:{paid:Number(hourlyPaid),entry:[]}}
			addJobAction(newJob)
			setJobName()
			setHourlyPaid()
			setPressable(true)
		}
	}
	const hourlyPaidHandler = t =>{
		const onlyNums = t.search(/([^\d\.\,])/g)
		if( onlyNums === -1 ){
			const cleanPaid = t.replace(/\,|\.\,|\,\.|\.{2,}|\.{2,}/g,'.')
			if(cleanPaid || cleanPaid == ''){
				if(cleanPaid.indexOf('.') === cleanPaid.lastIndexOf('.'))
					setHourlyPaid(cleanPaid)
			}
		}
	}
	const deleteJob = job =>{
		deleteJobAction(job)
	}
	onSubmitEditingHandler = caller =>{
		if(jobName && hourlyPaid)
			addJob()
		else{
			caller ? jobNameRef.current.focus() : hourlyPaidRef.current.focus()
		}
	}

	return (
		<TouchableWithoutFeedback onPress = {()=>Keyboard.dismiss()}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.mainView}>
					<View style={styles.jobForm}>
						<TextInput style={styles.input} placeholder='Job name' placeholderTextColor='white' ref = {jobNameRef}
							 onChangeText={(t)=>setJobName(t)} value={jobName} onSubmitEditing = {()=>onSubmitEditingHandler(0)} />
						<TextInput style={styles.input} placeholder='Hourly paid' placeholderTextColor='white'
							 onChangeText={(t)=>hourlyPaidHandler(t)} value={hourlyPaid} ref = {hourlyPaidRef} 
							keyboardType='number-pad' onSubmitEditing = {()=>onSubmitEditingHandler(1)}/>
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
		</TouchableWithoutFeedback>
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