export const ADD_JOB = 'ADD_JOB'
export const DELETE_JOB = 'DELETE_JOB'

export const addJobAction = job => ({
	type:ADD_JOB,
	payload:job
})
export const deleteJobAction = job =>({
	type:DELETE_JOB,
	payload:job
})