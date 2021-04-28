import {ADD_JOB,addJobAction,
		DELETE_JOB,deleteJobAction,
		ADD_ENTRY,addEntryAction,
		TOGGLE_IS_PAID,toggleIsPaidAction,
		DELETE_DATES,deleteDatesAction,
		IS_RUNNING,isRunningAction,
		IS_NOT_RUNNING,isNotRunningAction,
		IS_PAUSED,pauseAction,
		SET_STATE,setStateAction,
		EDIT_ENTRY,editEntryAction,
} from './action.js'

export const jobReducer = (state={},action) =>{
	switch(action.type){
		case ADD_JOB: return {...state,...action.payload}
		case DELETE_JOB: {
			const {[action.payload]:value,...newState} = state
			return newState
		} 
		case ADD_ENTRY: {
			const {payload} = action
			const {job,date,...jobEntry} = payload
			const newState = {...state} //shallow copy, should be deep with lodash
//access to the entry prop of [job name]'s property and create arr of obj with [entry date] index
			newState[job].entry = {...newState[job].entry,[date]:[...newState[job].entry[date] || [],jobEntry]} 
			return newState
		}
		case EDIT_ENTRY:{
			const newState = {...state}
			const {job,date,...entry} = action.payload
			const newEntry = Object.values(entry)
			newState[job].entry[date] = newEntry
			return newState
		}
		case DELETE_DATES:{
			const {job,dates} = action.payload
			const newState = {...state}//JSON.parse(JSON.stringify(state)) //shallow copy, should be deep with lodash
			dates.map(data => delete newState[job].entry[data])
			return newState
		}
		case TOGGLE_IS_PAID:{
			const {job,...dates} = action.payload
			const newState = {...state}
			dates.selection.map(data=>{
				newState[job].entry[data].map(day=>{
					day.isPaid = !day.isPaid
				})
			})
			return newState
		}
		default: return state
	}
}
export const backgroundReducer = (state={totalTime:0,startTime:0,isRunning:false,paused:false,state:'stop'},action) =>{
	switch(action.type){
		case IS_RUNNING : return {...state,startTime: action.payload ? action.payload : state.startTime,isRunning:true,paused:false,state:'play'}
		case IS_NOT_RUNNING : return {totalTime:0,startTime:0,isRunning:false,paused:false,state:'stop'}
		case IS_PAUSED : return {...state,totalTime:action.payload,paused:true,state:'pause'}
		default : return state	
	}
}