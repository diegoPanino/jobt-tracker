import {ADD_JOB,addJobAction} from './action.js'

export const jobReducer = (state={name:'',totH:0,paid:0,entry:[{date:'',hours:0}]},action) =>{
	switch(action.type){
		case ADD_JOB: return {...state,...action.payload}
		default: return state
	}
}