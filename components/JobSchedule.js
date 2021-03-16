import React,{useState,useEffect} from 'react'
import {View, StyleSheet, SectionList} from 'react-native'
import MyText from './MyText.js'
import JobScheduleRow from './JobScheduleRow.js'

export default function JobSchedule(props){
	const {jobs,selectedJob} = props
	const [jobLoaded,setJobLoaded] = useState(false)
	let sections,montlyWorkingDay

	useEffect(()=>{
		if(selectedJob)
			setJobLoaded(true)
	},[selectedJob])

	const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];
	const transformDateHeader = date =>{
		const splittedData = date.split('/')
		switch(splittedData[1]){
			case '1': return 'Jan ' + splittedData[2]
			case '2': return 'Feb ' + splittedData[2]
			case '3': return 'Mar ' + splittedData[2]
			case '4': return 'Apr ' + splittedData[2]
			case '5': return 'May ' + splittedData[2]
			case '6': return 'Jun ' + splittedData[2]
			case '7': return 'Jul ' + splittedData[2]
			case '8': return 'Aug ' + splittedData[2]
			case '9': return 'Sep ' + splittedData[2]
			case '10': return 'Oct ' + splittedData[2]
			case '11': return 'Nov ' + splittedData[2]
			case '12': return 'Dec ' + splittedData[2]
		}
	}

	if(selectedJob){
		montlyWorkingDay = Object.entries(jobs[selectedJob].entry).reduce((acc,el) =>{
			const month = transformDateHeader(el[0])
			return {
				...acc,
				[month]:[...(acc[month] || []),...el[1]]
			}
		},{})
		sections = Object.entries(montlyWorkingDay).map((el,i)=>{
			return {
				day:el[0],
				data:el[1],
				key:i
			}
		})
	}
	return (
		<View style={styles.mainView}>
			{jobLoaded && <SectionList
				sections = {sections}
				renderItem = { ({item,index}) => <JobScheduleRow item = {item} key = {item.key}/>}
				renderSectionHeader = { ({section}) =>{
						return (
							<View style={styles.sectionHeader}>
								<MyText myStyle={styles.header}>{section.day}</MyText>	
							</View>
						)
					}
				} 
			/>}
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		width:'100%',
		borderWidth:3,
		borderColor:'#6761a8',
		borderRadius:5,
		padding:'2.5%',
	},
	sectionHeader:{
		flex:1,
		alignSelf:'center'
	},
	header:{
		color:'red',
		flex:1,
		textAlign:'center'
	}
})