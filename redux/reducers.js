import {ADD_JOB,addJobAction,
		DELETE_JOB,deleteJobAction,
		ADD_ENTRY,addEntryAction,	
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
			const newState = {...state}
//access to the entry prop of [job name]'s property and create arr of obj with [entry date] index
			newState[job].entry = {...newState[job].entry,[date]:[...newState[job].entry[date] || [],jobEntry]} 
			return newState
		}
		default: return state
	}
}