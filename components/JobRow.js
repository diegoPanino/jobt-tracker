import React,{useState,useRef,useEffect} from 'react'
import {View,StyleSheet,Alert,Modal,Pressable, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import MyButton from './MyButton.js'
import MyText from './MyText.js'

export default function JobRow({jobName,salary,jobDel,jobEdit,blur}){
	const [editModal,setEditModal] = useState(false)
	const [jobInput,setJobInput] = useState(jobName)
	const [salaryInput,setSalaryInput] = useState(salary.toString())

	function usePrevious(value) {
	 	const ref = useRef();
	  	useEffect(() => {
	    	ref.current = value;
	  	});
	  	return ref.current;
	}

	const confirmDeleteAlert = () =>{
		Alert.alert(
			'Delete job',
			`Are you sure to delete ${jobName}?`,
			[{
				text:'NO'
			},
			{
				text:'YES',
				onPress: () => deleteJob()
			}]
			)
	}
	const deleteJob = () =>{
		jobDel(jobName)
	}
	const saveEdit = () =>{
		if(jobName === jobInput){
			//edit only salary call jobEdit with array of 2 i.e: job[jobName,salaryInput]
			const job = {name:jobName,paid:salaryInput}
			jobEdit(job)
		}			
		else{
			//edit name and salary call jobEdit with array of 3 i.e: job[jobName,jobInput,salaryInput]
			const job = {name:jobName,newName:jobInput,paid:salaryInput}
			jobEdit(job)
		}
		toggleEditModal()
	}
	const toggleEditModal = () =>{
		setEditModal(!editModal)
		setJobInput(jobName)
		setSalaryInput(salary.toString())
		blur()
	}
	const hourlyPaidHandler = t =>{
		const onlyNums = t.search(/([^\d\.\,])/g)
		if( onlyNums === -1 ){
			const cleanPaid = t.replace(/\,|\.\,|\,\.|\.{2,}|\.{2,}/g,'.')
			if(cleanPaid || cleanPaid == ''){
				if(cleanPaid.indexOf('.') === cleanPaid.lastIndexOf('.'))
					setSalaryInput(cleanPaid)
			}
		}
	}
	const pressedStyle = pressed => [{
		backgroundColor: !pressed ? 'transparent' : '#009DDC',
	},styles.btnPres]
	return (
			<View style = {styles.mainView}>
				{editModal && <Modal animationType='slide' transparent={true} visible={editModal} onRequestClose = {toggleEditModal}>
					<View style = {styles.editModalContainer}>
						<View style =  {styles.titleView}>
							<View style = {styles.textTitleView}>
								<MyText>EDIT JOB</MyText>
							</View>
							<Pressable style = {styles.closeIco} >
								<Icon name = 'close' size = {50} color = 'white' /> 
							</Pressable>
						</View>
						<View style = {styles.contentView}>
							<TextInput 	style={styles.input} value = {jobInput} onChangeText = {(t)=>setJobInput(t)} />
							<TextInput 	style={styles.input} value = {salaryInput} onChangeText={(t)=>hourlyPaidHandler(t)}
										keyboardType='number-pad' />
						</View>	
						<View style = {styles.btnView}>
							<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {saveEdit}>
								<View style = {styles.btnTextView}><MyText style = {styles.btnText}>Done</MyText></View>
								<View style = {styles.btnIcoView}><Icon name = 'checkmark' size = {40} color = '#009B72' /></View>
						</Pressable>
						</View>
					</View>
				</Modal>
				}
				<MyText>{jobName}</MyText>
				<View style = {styles.icoContainer}>
					<MyButton press = {toggleEditModal}>
						<Icon style = {styles.ico} name = 'pencil' size = {20} color = '#009ddc' />
					</MyButton>
					<MyButton press = {confirmDeleteAlert}>
						<Icon style = {styles.ico} name = 'trash' size = {20} color = '#009ddc' />
					</MyButton>
				</View>
			</View>
		)
}

const styles = StyleSheet.create({
	mainView:{
		marginRight:10,
		marginLeft:10,
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#6761a8',
		minHeight:50,
		flexDirection:'row',
		justifyContent:'space-between'
	},
	icoContainer:{
		flexDirection:'row',
	},
	ico:{
		padding:5
	},
	editModalContainer:{
		backgroundColor:'#2a2d34',
		padding:10,
		paddingTop:15,
	},
	titleView:{
		flexDirection:'row',
		borderBottomWidth:1,
		borderColor:'#6761A8'
	},
	textTitleView:{
		flex:1,
		justifyContent:'flex-end',
	},
	closeIco:{
		flex:1,
		alignItems:'flex-end',
		justifyContent:'flex-start'
	},
	contentView:{
		marginTop:20,
	},
	input:{
		alignSelf:'center',
		color:'white',
		width:'60%',
		textAlign:'center',
		margin:20,
		paddingBottom:0,
		borderBottomWidth:1,
		borderColor:'#6761a8',
	},
	btnView:{
		borderTopWidth:1,
		borderColor:'#6761A8',
		alignItems:'center',
		padding:5,
	},
	btnPres:{
		flexDirection:'row',
		alignItems:'center',
		borderWidth:1,
		borderColor:'#6761A8',
		padding:5,
		marginTop:10,
		borderRadius:10,
	}
})