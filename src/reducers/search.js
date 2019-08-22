import { combineReducers } from 'redux';
import {handleActions} from 'redux-actions';
import { searchSuccess, searchRequest, searchFailure } from '../actions/search';


const isFetching = handleActions(
	{
		[searchRequest]: () => true,
		[searchSuccess]: () => false,
		[searchFailure]: () => false
	},
	false
)

const result = handleActions(
	{
		[searchSuccess]: (state, action) => action.payload,
	},
	[]
)

const error = handleActions(
	{
		[searchFailure]: (state, action) => action.error
	},
	null
)

export default combineReducers({
	isFetching,
	result,
	error
})

export const getResult = state => state.search.result;
export const getIsFetching = state => state.search.isFetching;
export const getError = state => state.search.error;