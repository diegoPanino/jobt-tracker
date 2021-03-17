import React,{useState} from 'react'
import {View,StyleSheet,Pressable} from 'react-native'
import MyText from './MyText.js'

export default function JobScheduleRow(props){
	const {itemKey,item,section,selection} = props
	const [selected,setSelected] = useState(false)

	const sumH = (a,b) =>{
		const x = a.split(':')
		const y = b.split(':')
		const h1 = Number(x[0])
		const m1 = Number(x[1])
		const h2 = Number(y[0])
		const m2 = Number(y[1])
		let m = m1 + m2
		let h = m>59 ? h1+h2+1 : h1+h2
		m = m % 60
		m = m > 9 ? m : '0'+m
		h = h > 9 ? h : '0'+h
		return h + ':' + m
	}

	const selectDay = day =>{
		const temp = section.day.split(' ')
		const year = temp[1]
		let month
		switch(temp[0]){
			case 'Jan': {month = '1'; break}
			case 'Feb': {month = '2'; break}
			case 'Mar': {month = '3'; break}
			case 'Apr': {month = '4'; break}
			case 'May': {month = '5'; break}
			case 'Jun': {month = '6'; break}
			case 'Jul': {month = '7'; break}
			case 'Aug': {month = '8'; break}
			case 'Sep': {month = '9'; break}
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
			<Pressable onLongPress = {()=>selectDay(day[1])} delayLongPress={250}>
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
					<View style={styles.hours}><MyText style={[styles.text, item[0].isPaid ? {backgroundColor:'#009B72'}:{}]}>{totH}h</MyText></View>
				</View>
			</Pressable>
		)
	}
	else if (item.length === 1) {
		const {hours,day,start,end,isPaid} = item[0]
		const d = day.split(',')
		return (
			<Pressable onLongPress = {()=>selectDay(d[1])} delayLongPress={250}>
				<View style={[styles.mainView,selected ? {backgroundColor:'#009ddc'} : {}]}>
					<View style={styles.day}>
						<MyText style={styles.text}>{d[0]}</MyText>
						<MyText style={styles.text}>{d[1]}</MyText>
					</View>
					<View style={styles.startSingle}><MyText style={styles.text}>{start}</MyText></View>
					<View style={styles.endSingle}><MyText style={styles.text}>{end}</MyText></View>
					<View style={styles.hours}><MyText style={[styles.text, isPaid ? {backgroundColor:'#009B72'}:{}]}>{hours}h</MyText></View>
				</View>
			</Pressable>
		)
	}
	else{
		return item.map((entry,i)=>{
			const {hours,day,start,end,isPaid} = entry
			const d = day.split(',')
			return (
				<Pressable onLongPress = {()=>selectDay(d[1])} delayLongPress={250}>
					<View style={[styles.mainView,selected ? {backgroundColor:'#009ddc'} : {}]} key={itemKey+i}>
						<View style={styles.day}>
							{(i===0) && <MyText style={styles.text}>{d[0]}</MyText>}
							{(i===0) && <MyText style={styles.text}>{d[1]}</MyText>}
						</View>
						<View style={styles.startSingle}><MyText style={styles.text}>{start}</MyText></View>
						<View style={styles.endSingle}><MyText style={styles.text}>{end}</MyText></View>
						<View style={styles.hours}><MyText style={[styles.text, isPaid ? {backgroundColor:'#009B72'}:{}]}>{hours}h</MyText></View>
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
		backgroundColor:'#F26430'
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
	}
})



/*	return (
		<View style={styles.mainView}>
			<View style={styles.day}><MyText style={styles.text}>{day}</MyText></View>
			<View style={styles.morning}>
				<View style={styles.start}><MyText style={styles.text}>{start}</MyText></View>
				<View style={styles.end}><MyText style={styles.text}>{end}</MyText></View>
			</View>
			<View style={styles.evening}>
				<View style={styles.start}><MyText style={styles.text}>{start}</MyText></View>
				<View style={styles.end}><MyText style={styles.text}>{end}</MyText></View>
			</View>
			<View style={styles.hours}><MyText style={styles.text}>{(hours)}</MyText></View>
		</View>
		)*/