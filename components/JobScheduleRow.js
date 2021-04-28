import React,{useState,useEffect} from 'react'
import {View,StyleSheet,Pressable} from 'react-native'
import MyText from './MyText.js'
import {sumH} from '../utility/Utility.js'

export default function JobScheduleRow(props){
	const {keyIndex,item,section,selection,deselect,paidUnpaidSelection} = props
	const [selected,setSelected] = useState(false)
	useEffect(()=>{
		if(paidUnpaidSelection.length > 0 ){
			const temp = section.day.split(' ')
			const year = temp[1]
			const day = item[0].day.split(',')
			let month
			switch(temp[0]){
				case 'Jan': {month = '01'; break}
				case 'Feb': {month = '02'; break}
				case 'Mar': {month = '03'; break}
				case 'Apr': {month = '04'; break}
				case 'May': {month = '05'; break}
				case 'Jun': {month = '06'; break}
				case 'Jul': {month = '07'; break}
				case 'Aug': {month = '08'; break}
				case 'Sep': {month = '09'; break}
				case 'Oct': {month = '10'; break}
				case 'Nov': {month = '11'; break}
				case 'Dec': {month = '12'; break}
			}
			const date = day[1]+'/'+month+'/'+year
			if(paidUnpaidSelection.includes(date))
				selectDay(day[1])
		}
	},[paidUnpaidSelection])

	useEffect(()=>{
		if(deselect)
			setSelected(false)
	},[deselect])

	const selectDay = day =>{	
		const temp = section.day.split(' ')
		const year = temp[1]
		let month
		switch(temp[0]){
			case 'Jan': {month = '01'; break}
			case 'Feb': {month = '02'; break}
			case 'Mar': {month = '03'; break}
			case 'Apr': {month = '04'; break}
			case 'May': {month = '05'; break}
			case 'Jun': {month = '06'; break}
			case 'Jul': {month = '07'; break}
			case 'Aug': {month = '08'; break}
			case 'Sep': {month = '09'; break}
			case 'Oct': {month = '10'; break}
			case 'Nov': {month = '11'; break}
			case 'Dec': {month = '12'; break}
		}
		setSelected(prev => !prev)	
		selection(day+'/'+month+'/'+year)	
	}

	if(item.length === 2){
		const totH = sumH(item[0].hours,item[1].hours)
		const day = item[0].day.split(',')
		return (
			<Pressable onPress = {()=>selectDay(day[1])} delayLongPress={250}>
				<View style={[styles.mainView,selected ? {backgroundColor:'#009ddca5'} : {}]}>
					<View style={styles.day}>
						<MyText style={styles.text}>{day[0]}</MyText>
						<MyText style={styles.text}>{day[1]}</MyText>
					</View>
					<View style={styles.morning}>
						<View style={styles.start}>
							<MyText style={styles.text}>{item[0].start + '-' + item[0].end}</MyText>
						</View>
					</View>
					<View style={styles.evening}>
						<View style={styles.start}>
							<MyText style={styles.text}>{item[1].start + '-' + item[1].end}</MyText>
						</View>
					</View>
					<View style={styles.hours}><MyText style={[styles.text,styles.hoursPadding, item[0].isPaid ? {backgroundColor:'#009B72'}:{backgroundColor:'#F26430'}]}>{totH}h</MyText></View>
				</View>
			</Pressable>
		)
	}
	else if (item.length === 1) {
		const {hours,day,start,end,isPaid} = item[0]
		const d = day.split(',')
		return (
			<Pressable onLongPress = {()=>selectDay(d[1])} delayLongPress={250}>
				<View style={[styles.mainView,selected ? {backgroundColor:'#009ddca5'} : {}]}>
					<View style={styles.day}>
						<MyText style={styles.text}>{d[0]}</MyText>
						<MyText style={styles.text}>{d[1]}</MyText>
					</View>
					<View style={styles.startSingle}><MyText style={styles.text}>{start}</MyText></View>
					<View style={styles.endSingle}><MyText style={styles.text}>{end}</MyText></View>
					<View style={styles.hours}><MyText style={[styles.hoursPadding,styles.text, isPaid ? {backgroundColor:'#009B72'}:{backgroundColor:'#F26430'}]}>{hours}h</MyText></View>
				</View>
			</Pressable>
		)
	}
	else{
		return item.map((entry,i)=>{
			const {hours,day,start,end,isPaid} = entry
			const d = day.split(',')
			return (
				<Pressable onLongPress = {()=>selectDay(d[1])} delayLongPress={250} key={keyIndex+i}>
					<View style={[styles.mainView,selected ? {backgroundColor:'#009ddca5'} : {}]} >
						<View style={styles.day}>
							{(i===0) && <MyText style={styles.text}>{d[0]}</MyText>}
							{(i===0) && <MyText style={styles.text}>{d[1]}</MyText>}
						</View>
						<View style={styles.startSingle}><MyText style={styles.text}>{start}</MyText></View>
						<View style={styles.endSingle}><MyText style={styles.text}>{end}</MyText></View>
						<View style={styles.hours}><MyText style={[styles.text,styles.hoursPadding, isPaid ? {backgroundColor:'#009B72'}:{backgroundColor:'#F26430'}]}>{hours}h</MyText></View>
					</View>
				</Pressable>
				)
		})
	}
	 
	
}
const styles = StyleSheet.create({
	mainView:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		paddingRight:5,
		paddingLeft:5,
		zIndex:1,
	},
	day:{
		flex:0.8,
	},
	morning:{
		flex:2,
		flexDirection:'row',
	},
	evening:{
		flex:2,
		flexDirection:'row',
	},
	hours:{
		flex:1,
		alignItems:'center',
	},
	start:{
		flex:2,
		alignItems:'center'
	},
	end:{
		flex:2,
		alignItems:'center'
	},
	startSingle:{
		flex:2,
		alignItems:'center'
	},
	endSingle:{
		flex:2,
		alignItems:'center'
	},
	text:{
		fontSize:16,
	},
	hoursPadding:{
		paddingLeft:2,
		paddingRight:2,
	}
})
