import React,{useState} from 'react'
import {SafeAreaView,View,Text,StyleSheet,TextInput,Alert} from 'react-native'
import {connect} from 'react-redux'
import {addJobAction} from '../redux/action.js'
import MyButton from '../components/MyButton.js'

function JobsScreen({addJobAction}){
	const [jobName,setJobName] = useState()
	const [hourlyPaid,setHourlyPaid] = useState()
	const [pressable,setPressable] = useState(true)

	const pressedStyle = pressed =>[{
		borderColor:pressed ? '#f26430' : 'white'
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
			const newJob = {name:jobName,totH:0,paid:hourlyPaid,entry:[{date:'',hours:0}]}
			addJobAction(newJob)
			setJobName()
			setHourlyPaid()
			setPressable(true)
		}
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.mainView}>
				<View style={styles.jobForm}>
					<TextInput style={styles.input} placeholder='Job name' onChangeText={(t)=>setJobName(t)} value={jobName} />
					<TextInput style={styles.input} placeholder='Hourly paid' onChangeText={(t)=>setHourlyPaid(t)} value={hourlyPaid}
						keyboardType='number-pad' />
					<MyButton style={({pressed})=>pressedStyle(pressed)} press={addJob} disabled={!pressable}>
						<Text style={styles.btnText}>AGGIUNGI</Text>
					</MyButton>
				</View>
			</View>
		</SafeAreaView>
		)
}
export default connect(null,{addJobAction})(JobsScreen)

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
	jobForm:{
		backgroundColor:'#009b72',
		width:'80%',
		justifyContent:'center',
		alignItems:'center',
		elevation:3,
		borderWidth:1,
		borderColor:'#6761a8',
	},
	input:{
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
		borderRightWidth:2,
		borderLeftWidth:2,
	},
	btnText:{
		textAlign:'center',
		color:'white',
		fontSize:20,
	}
})