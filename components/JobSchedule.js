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
				[month]:[...(acc[month] || []),el[1]]
			}
		},{})
		sections = Object.entries(montlyWorkingDay).map((el,i)=>{
			return {
				day:el[0],
				data:el[1],
			}
		})
	}
	return (
		<View style={styles.mainView}>
			{jobLoaded && <SectionList
				sections = {sections}
				keyExtractor = {(item, index) => item + index}
				renderSectionHeader = { ({section}) => <MyText myStyle={styles.header}>{section.day}</MyText>}
				renderItem = { ({item,index}) => <JobScheduleRow item = {item} key = {index}/>}
			/>}
		</View>
		)
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		justifyContent:'center',
		backgroundColor:'blue'
	},
	header:{

	}
})