import {ADD_JOB,addJobAction,
		DELETE_JOB,deleteJobAction,
		ADD_ENTRY,addEntryAction,
		TOGGLE_IS_PAID,toggleIsPaidAction,
		DELETE_DATES,deleteDatesAction,
		IS_RUNNING,isRunningAction,
		IS_NOT_RUNNING,isNotRunningAction
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
		case DELETE_DATES:{
			const {job,dates} = action.payload
			const newState = {...state}//JSON.parse(JSON.stringify(state)) //shallow copy, should be deep with lodash
			dates.map(data => delete newState[job].entry[data])
			return newState
		}
		default: return state
	}
}
export const backgroundReducer = (state={startTime:0,isRunning:false},action) =>{
	switch(action.type){
		case IS_RUNNING : return {...state,startTime:action.payload,isRunning:true}
		case IS_NOT_RUNNING : return {...state,startTime:0,isRunning:false}
		default : return state	
	}
	

}