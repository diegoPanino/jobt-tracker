import {createStore,combineReducers,applyMiddleware} from 'redux'
import {persistStore,persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {composeWithDevTools,devToolsEnhancer} from 'redux-devtools-extension'
import {jobReducer} from './reducers.js'

const reducers = combineReducers({
	job:jobReducer
})
const rootReducer = (state={},action)=>{
	if(action.type === 'CLEAN_STORE'){
		state.result = undefined
	}
	return reducers(state,action)
}

const persistConfig ={
	key:'root',
	storage:AsyncStorage,
	timeout:null,
}

const onEndRehydrationHandler=()=>{
	const state = store.getState()
}

const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store = createStore(persistedReducer,devToolsEnhancer());
export const persistor = persistStore(store,{},onEndRehydrationHandler);
