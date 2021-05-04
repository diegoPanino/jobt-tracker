import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Modal,Pressable} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/dist/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import {editEntryAction,deleteEntryAction} from '../redux/action.js'
import MyText from './MyText.js'
import {subH} from '../utility/Utility.js'
import EditRow from './EditRow.js'

function EditPage(props){
	const {itemSelection,selectedJob,toggleEditPage,editEntryAction,deleteEntryAction} = props
	const item = itemSelection[0] 
	const {jobs} = props
	const [showSaveBtn,setShowSaveBtn] = useState(false)
	const [editedEntry,setEditedEntry] = useState([...jobs[selectedJob].entry[item]])

	const saveEdit = () =>{
		editEntryAction({...[...editedEntry],job:selectedJob,date:item})
		toggleEditPage()
	}
	const saveBtnHandler = entry =>{
		const start = moment(entry.start).format('HH:mm')
		const end = moment(entry.end).format('HH:mm')
		const hours = subH(start,end)
		setShowSaveBtn(true)
		const stateCopy = [...editedEntry]
		stateCopy[entry.i] = {...stateCopy[entry.i],start,end,hours}
		setEditedEntry(stateCopy)
	}
	const onDeleteRowHandler = entry =>{
		const {date,i} = entry
		deleteEntryAction({date,i,selectedJob})
	}

	return (
		<View style = {styles.mainView}>
			<View style =  {styles.titleView}>
				<View style = {styles.textTitleView}>
					<MyText>EDIT TIME</MyText>
				</View>
				<Pressable style = {styles.closeIco} onPress = {toggleEditPage}>
					<Icon name = 'close' size = {50} color = 'white' /> 
				</Pressable>
			</View>
			<View style = {styles.contentView}>
				<View style = {styles.dayView}>
					<MyText style = {{textAlign:'center'}}>{item} ({moment(item,'DD/MM/YYYY').format('dddd')})</MyText>
				</View>
				<View style = {styles.headView}>
					<View>
						<MyText style = {styles.headText}>START TIME</MyText>
					</View>
					<View>
						<MyText style = {styles.headText}>END TIME</MyText>
					</View>
				</View>
				{jobs[selectedJob].entry[item].map((entry,i)=>{ 
					return <EditRow date = {item} item = {entry} i = {i} 
									deleteRow = {entry => onDeleteRowHandler(entry)}
									showSaveBtn = {entry=>saveBtnHandler(entry)}
									showDeleteBtn = {jobs[selectedJob].entry[item].length}
									key = {i}/>}
					)}
			</View>
			{showSaveBtn && 
				<View style = {styles.btnView}>
					<Pressable onPress = {saveEdit}>
						<MyText>Save changes
							<Icon name='checkmark' color='#009B72' size={35}/>
						</MyText>
					</Pressable>
				</View>}
		</View>
		)
}
const mapStateToPros = state =>({
	jobs:state.jobs,
})
export default connect(mapStateToPros,{editEntryAction,deleteEntryAction})(EditPage)
const styles = StyleSheet.create({
	mainView:{
		position:'absolute',
		top:0,
		left:'1%',
		backgroundColor:'#2a2d34',
		zIndex:50,
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
	headView:{
		flexDirection:'row',
		justifyContent:'space-evenly',
		margin:10,
	},
	headText:{
		fontSize:18,
	},
	dayView:{
		marginRight:'20%',
		marginLeft:'20%',
		justifyContent:'center',
		alignItems:'center',
		borderBottomWidth:1,
		borderColor:'#6761A8'
	},
	btnView:{
		alignItems:'center',
	}
})