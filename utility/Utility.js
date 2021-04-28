export 	const getMoneyfromH = (hh,paid) => {
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

export 	const sumH = (a,b) =>{
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

export const subH = (a,b) =>{
	const x = a.split(':')
	const y = b.split(':')
	const h1 = Number(x[0])
	const m1 = Number(x[1])
	const h2 = Number(y[0])
	const m2 = Number(y[1])
	let m,h
	if(h1>h2){
		m = m2 - m1 
		h = m < 0 ? 24 - h1 + h2 -1 : 24 - h1 + h2
		m = m < 0 ? m2 + (60 - m1) : m
	}
	else{
		m = m2 - m1
		h = m < 0 ? h2 - h1 -1 : h2 - h1
		m = m < 0 ? m2 + (60 - m1) : m
	}
	m= (((m + 7.5)/15 | 0) * 15) % 60
	h = ((((m/105) + .5) | 0) + h) % 24
	m = m > 9 ? m : '0'+m
	h = h > 9 ? h : '0'+h
	return h + ':' + m
}

export 	const transformDateHeader = date =>{
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

export 	const fromMsToH = millisec =>{
	const ms = parseInt((millisec % 1000) / 100)
    let seconds = Math.floor((millisec / 1000) % 60)
    let minutes = Math.floor((millisec / (1000 * 60)) % 60)
    let hours = Math.floor((millisec / (1000 * 60 * 60)) % 24)

    if(seconds > 30)
    	minutes = minutes + 1
    if(minutes > 52)
    	hours = hours + 1

	minutes= (((minutes + 7.5)/15 | 0) * 15) % 60
	hours = ((((minutes/105) + .5) | 0) + hours) % 24

	hours = (hours < 10) ? '0' + hours : hours
	minutes = (minutes < 10) ? "0" + minutes : minutes

  	return hours + ':' + minutes
}