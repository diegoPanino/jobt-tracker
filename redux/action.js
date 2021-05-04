export const ADD_JOB = 'ADD_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const ADD_ENTRY = 'ADD_ENTRY'
export const TOGGLE_IS_PAID = 'TOGGLE_IS_PAID'
export const DELETE_DATES = 'DELETE_DATES'
export const IS_RUNNING = 'IS_RUNNING'
export const IS_NOT_RUNNING = 'IS_NOT_RUNNING'
export const IS_PAUSED = 'IS_PAUSED'
export const SET_STATE = 'SET_STATE'
export const EDIT_ENTRY = 'EDIT_ENTRY'
export const DELETE_ENTRY = 'DELETE_ENTRY'

export const addJobAction = job => ({
	type:ADD_JOB,
	payload:job
})
export const deleteJobAction = job =>({
	type:DELETE_JOB,
	payload:job
})
export const addEntryAction = entry =>({
	type:ADD_ENTRY,
	payload:entry
})
export const toggleIsPaidAction = dates =>({
	type:TOGGLE_IS_PAID,
	payload:dates
})
export const deleteDatesAction = dates =>({
	type:DELETE_DATES,
	payload:dates
})
export const isRunningAction = time =>({
	type:IS_RUNNING,
	payload: time
})
export const isNotRunningAction = time => ({
	type:IS_NOT_RUNNING
})
export const pauseAction = time =>({
	type:IS_PAUSED,
	payload: time
})
export const setStateAction = state =>({
	type:SET_STATE,
	payload:state
})
export const editEntryAction = entry =>({
	type:EDIT_ENTRY,
	payload:entry
})
export const deleteEntryAction = entry =>({
	type:DELETE_ENTRY,
	payload:entry
})