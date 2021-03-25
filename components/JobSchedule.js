import React,{useState,useEffect,useRef} from 'react'
import {View, StyleSheet, SectionList,Modal,Animated} from 'react-native'
import MyText from './MyText.js'
import JobScheduleRow from './JobScheduleRow.js'
import ModalManageEntries from './ModalManageEntries.js'

export default function JobSchedule(props){
	const {jobs,selectedJob} = props
	const [jobLoaded,setJobLoaded] = useState(false)
	const [itemSelection,setItemSelection] = useState([])
	const [showModal,setShowModal] = useState(false)
	const [deselectAll,setDeselectAll] = useState(false)
	const fadeIn = useRef(new Animated.Value(0)).current
	let sections,montlyWorkingDay

	useEffect(()=>{
		if(itemSelection.length){
			setShowModal(true)
			Animated.timing(fadeIn,{
				toValue:1,
				duration:150,
				useNativeDriver:true
			}).start()	
			setDeselectAll(false)			
		}
		else{
			Animated.timing(fadeIn,{
				toValue:0,
				duration:150,
				useNativeDriver:true
			}).start(finished=>setShowModal(false))
			setDeselectAll(true)
		}
	},[itemSelection])

	const selectItem = day =>{
		const length =itemSelection.length
		let isc = itemSelection.filter(date=>{
			return date !== day
		})
		if(isc.length === length)
			isc = [...itemSelection,day]

		setItemSelection(isc)
	}
	const toggleSelection = day =>{
		setItemSelection([])
		setDeselectAll(true)
	}

	const getMoneyfromH = hh => {
		const {paid} = jobs[selectedJob]
		const temp = hh.split(':')
		const m = temp[1]
		let quarter 
		switch(m){
			case '15' : {quarter = 1/4; break}
			case '30' : {quarter = 1/2; break}
			case '45' : {quarter = 3/4; break}
			default: {quarter = 0; break}
		}
		const h = Number(temp[0])
		const $ = (h * paid) + (quarter * paid)
		return Number($)

	}
	const transformDateHeader = date =>{
		const splittedData = date.split('/')
		switch(splittedData[1]){
			case '01': return 'Jan ' + splittedData[2]
			case '02': return 'Feb ' + splittedData[2]
			case '03': return 'Mar ' + splittedData[2]
			case '04': return 'Apr ' + splittedData[2]
			case '05': return 'May ' + splittedData[2]
			case '06': return 'Jun ' + splittedData[2]
			case '07': return 'Jul ' + splittedData[2]
			case '08': return 'Aug ' + splittedData[2]
			case '09': return 'Sep ' + splittedData[2]
			case '10': return 'Oct ' + splittedData[2]
			case '11': return 'Nov ' + splittedData[2]
			case '12': return 'Dec ' + splittedData[2]
		}
	}

	if(selectedJob && Object.keys(jobs).length){
		montlyWorkingDay = Object.entries(jobs[selectedJob].entry).reverse().reduce((acc,el) =>{
			const month = transformDateHeader(el[0])
			return {
				...acc,
				[month]:[...(acc[month] || []),el[1]] //<-- each day is an array with diff entries |*|*| each day a line ----> [month]:[...(acc[month] || []),...el[1]]
			}
		},{})
		sections = Object.entries(montlyWorkingDay).map((el,i)=>{
			const money = el[1].map(day=>{
				return day.reduce((acc,element,i)=>{
					return acc + getMoneyfromH(element.hours)
				},0)	
			})
			return {
				day:el[0],
				data:el[1],
				money:money.reduce((acc,res)=>{return acc + res},0),
				key:i
			}
		})
	}

	useEffect(()=>{
		if(selectedJob)
			setJobLoaded(true)
		else
			(setJobLoaded(false))
	},[selectedJob])

	return (
		<View style={styles.mainView}>
			{jobLoaded && <SectionList
				style = {styles.sectionList}
				sections = {sections}
				keyExtractor={(item, index) => item + index}
				ListEmptyComponent = { () => <View style={styles.emptyList}><MyText>You didn't work, pal</MyText></View>}
				renderItem = { ({item,index,section}) => 
					<JobScheduleRow item = {item} selection = {(day)=>selectItem(day)} 
							section={section} keyIndex={index} key = {item.key} deselect = {deselectAll}/>}
				renderSectionHeader = { ({section}) =>{
						return (
							<View style={styles.sectionHeader}>
								<MyText style = {styles.header}>{section.day}</MyText>
								<MyText style =	{styles.money}>{section.money}$</MyText>
							</View>
						)
					}
				}
				ItemSeparatorComponent = { () => <View style={styles.separator} />} 
			/>}
			{showModal && 
				<Animated.View style={[styles.modal,{opacity:fadeIn}]}>
					<ModalManageEntries selection = {itemSelection} job={selectedJob} 
								toggleSelection = {toggleSelection} />
				</Animated.View>
			}
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		padding:'1%',
	},
	sectionList:{

	},
	modal:{
		height:'25%',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:5,
		backgroundColor:'#6761a8'
		
	},
	emptyList:{
		flex:1,
		alignItems:'center'
	},
	sectionHeader:{
		flex:1,
		flexDirection:'row',
		borderRadius:5,
		borderWidth:2,
		borderColor:'#6761a8',
		backgroundColor:'#6761a850'
	},
	separator:{
		borderWidth:1,
		borderColor:'#6761a8'
	},
	header:{
		color:'#009DDC',
		flex:1,
		marginLeft:5,
		textAlign:'left'
	},
	money:{
		flex:1,
		marginRight:5,
		textAlign:'right'
	}
})