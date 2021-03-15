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
			const {job,...jobEntry} = payload
			const newState = {...state}
			console.log('reducers',jobEntry.startTime)
			const date = jobEntry.startTime.split(',')
//access to the entry prop of [job name]'s property and create arr of obj with [entry date] index
			newState[job].entry = {...newState[job].entry,[date[0]]:[...newState[job].entry[date[0]] || [],jobEntry]} 
			return newState
		}
		default: return state
	}
}