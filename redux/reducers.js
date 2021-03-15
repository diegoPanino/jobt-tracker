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
			const date = jobEntry.startTime.split(',')
			//newState[job].entry.findIndex((el,i) = >{})
			//newState[job].entry = [...newState[job].entry,jobEntry]
			newState[job].entry = {...newState[job].entry,[date[0]]:jobEntry}
			console.log(newState[job].entry)
			//return newState
		}
		default: return state
	}
}

// (state=[{name:'',totH:0,paid:0,entry:[{startTime:0,endTime:0,hours:0}]}],action)