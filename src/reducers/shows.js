import { combineReducers } from 'redux';
import {handleActions} from 'redux-actions';
import { showRequest, showSuccess, showFailure } from './../actions/show';

const showId = handleActions(
	{
		[showRequest]: () => (state, action) => action.payload
	},
	null
);

const showInfo = handleActions(
  {
    [showSuccess]: (state, action) => {
      const {
        id,
        name,
        image: { medium },
        summary,
        _embedded: { cast }
      } = action.payload;

      return { id, name, image: medium, summary, cast };
    }
  },
  null
);

const error = handleActions(
  {
    [showFailure]: (state, action) => action.payload
  },
  null
);

const isLoading = handleActions(
  {
    [showRequest]: (state, action) => true,
		[showSuccess]: (state, action) => false,
    [showFailure]: (state, action) => false,		
  },
  true
);

export default combineReducers({
  showId,
  showInfo,
  error,
  isLoading
});

export const getResultShowId = state => state.show.showId;
export const getShowInfo = state => state.show.showInfo;
export const getErrorShow = state => state.show.error;
export const getIsLoading = state => state.show.isLoading;

