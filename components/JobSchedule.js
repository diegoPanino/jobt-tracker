import React,{useState,useEffect,useRef} from 'react'
import {View, StyleSheet, SectionList,Modal,Animated,Pressable} from 'react-native'
import {BlurView} from "@react-native-community/blur"
import MyText from './MyText.js'
import JobScheduleRow from './JobScheduleRow.js'
import ModalManageEntries from './ModalManageEntries.js'
import ResumePage from './ResumePage.js'
import EditPage from './EditPage.js'
import {getMoneyfromH,transformDateHeader,sumH} from '../utility/Utility.js'

export default function JobSchedule(props){
	const {jobs,selectedJob} = props
	const [jobLoaded,setJobLoaded] = useState(false)
	const [itemSelection,setItemSelection] = useState([])
	const [paidUnpaidSelection,setPaidUnpaidSelection] = useState([])
	const [resumeSelection,setResumeSelection] = useState([])
	const [showModal,setShowModal] = useState(false)
	const [showResumePage, setShowResumePage] = useState(false)
	const [showEditPage,setShowEditPage] = useState(false)
	const [deselectAll,setDeselectAll] = useState(false)
	const [selection$,setSelection$] = useState(0)
	const [selectionH,setSelectionH] = useState('00:00')
	const fadeIn = useRef(new Animated.Value(0)).current
	let sections,montlyWorkingDay

	useEffect(()=>{
		sections.map(day => {
		day.data.sort((a,b)=>{
			const day1 = a[0].day.split(',')
			const day2 = b[0].day.split(',')
			return Number(day2[1]) - Number(day1[1])
		})
	})
	},[jobs])

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
	useEffect(()=>{
		setItemSelection(paidUnpaidSelection)
	},[paidUnpaidSelection])
	useEffect(()=>{
		if(showResumePage){
			const newResSel = Object.entries(jobs[selectedJob].entry).filter(el => itemSelection.includes(el[0]))
			const totalHArr = newResSel.map(entry => {
				return entry[1].reduce((acc,el) => {
					return sumH(acc,el.hours)
				},'00:00')
			})
			const totalH = totalHArr.reduce((acc,el)=>{
				return sumH(acc,el)
			},'00:00')
			const total$ = getMoneyfromH(totalH,jobs[selectedJob].paid)
			setResumeSelection(newResSel)
			setSelectionH(totalH)
			setSelection$(total$)
		}
	},[showResumePage])

	const selectItem = day =>{
		const length = itemSelection.length
		let isc = itemSelection.filter(date=>{
			return date !== day
		})
		if(isc.length === length)
			isc = [...itemSelection,day]
		
		setItemSelection(isc)
	}
	const toggleSelection = day =>{
		setPaidUnpaidSelection([])
		setDeselectAll(true)
	}

	const fastSelection = type =>{
		if(itemSelection.length && paidUnpaidSelection.length){
			toggleSelection()
		}
		else{
			const newSelection = Object.entries(jobs[selectedJob].entry).filter(entry =>{
				return entry[1][0].isPaid === type
			})
			const pUSelection = newSelection.map(day=>{
				return day[0]
			})
			setPaidUnpaidSelection(pUSelection)
		}
	}

	if(selectedJob && Object.keys(jobs).length){
		montlyWorkingDay = Object.entries(jobs[selectedJob].entry).sort((a,b)=>{
			const date1 = a[0].split('/')
			const date2 = b[0].split('/')
			if(date1[2] === date2[2]){
				if(date1[1] === date2[1]){
					return Number(date2[0]) - Number(date1[0]) //different day
				}//end of same month
				else return Number(date2[1]) - Number(date1[1]) //different month
			}//end of same year if
			else return Number(date2[2]) - Number(date1[2]) //different year

		}).reduce((acc,el) =>{
			const month = transformDateHeader(el[0])
			return {
				...acc,
				[month]:[...(acc[month] || []),el[1]] //<-- each day is an array with diff entries |*|*| each day a line ----> [month]:[...(acc[month] || []),...el[1]]
			}
		},{})
		sections = Object.entries(montlyWorkingDay).map((el,i)=>{
			const money = el[1].map(day=>{
				return day.reduce((acc,element,i)=>{
					return acc + getMoneyfromH(element.hours,jobs[selectedJob].paid)
				},0)	
			})
			return {
				day:el[0],
				data:el[1],
				money:Number(money.reduce((acc,res)=>{return acc + res},0)).toFixed(0),
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

	const toggleResumePage = () =>{
		setShowResumePage(prevState => !prevState)
	}
	const toggleEditPage = () =>{
		setShowEditPage(prevState => !prevState)
	}
	const pressedStyle = pressed =>[{
		backgroundColor: pressed ? '#009ddc' : 'transparent'
	},styles.closeBtn]

	return (
		<View style={styles.mainView}>
		{showResumePage && 
				<ResumePage toggleResumePage = {toggleResumePage} selection = {resumeSelection} salary = {selection$} totalH = {selectionH} />
		}
		{jobLoaded &&
			<View style={styles.contentView}>
				{!paidUnpaidSelection.length && 
					<View style = {styles.unpaidSel}>
						<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {()=>fastSelection(false)}>
							<MyText style = {styles.textCounter}>Select unpaid</MyText>
						</Pressable>
						<Pressable style = {({pressed})=>pressedStyle(pressed)} onPress = {()=>fastSelection(true)}>
							<MyText style = {styles.textCounter}>Select paid</MyText>
						</Pressable>
					</View>
				}
				<SectionList
					style = {styles.sectionList}
					sections = {sections}
					keyExtractor={(item, index) => item + index}
					ListEmptyComponent = { () => <View style={styles.emptyList}><MyText>You didn't work, pal</MyText></View>}
					renderItem = { ({item,index,section}) => 
						<JobScheduleRow item = {item} selection = {(day)=>selectItem(day)} paidUnpaidSelection = {paidUnpaidSelection}
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
				/>
			</View>
			}
			{showModal && 
				<Animated.View style={[styles.modal,{opacity:fadeIn}]}>
					<ModalManageEntries selection = {itemSelection} job={selectedJob}
								toggleSelection = {toggleSelection} resumePage = {toggleResumePage} editPage = {toggleEditPage} />
				</Animated.View>
			}
			{showEditPage &&
				<>
				<BlurView style={styles.absolute}
         				 blurType="light" blurAmount={5} />
				<EditPage toggleEditPage = {toggleEditPage} itemSelection = {itemSelection} selectedJob = {selectedJob} />
				</>
			}
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		padding:'1%',
	},
	contentView:{
		flex:1,
	},
	sectionList:{

	},
	modal:{
		height:'25%',
		justifyContent:'center',
		alignItems:'center',
		borderRadius:5,
		backgroundColor:'#6761a8',
		zIndex:10,
		
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
	},
	closeBtn:{
		alignSelf:'center',
		paddingRight:10,
		paddingLeft:10,
		borderWidth:1,
		borderColor:'#009ddc',
		borderRadius:40,
	},
	unpaidSel:{
		flexDirection:'row',
		justifyContent:'space-between',
		margin:2,
	},
	absolute:{
		position:'absolute',
		top:0,
		bottom:0,
		right:0,
		left:0,
	}
})