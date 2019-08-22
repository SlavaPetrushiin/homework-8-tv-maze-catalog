// Реализуйте showMiddleware

// Вам необходимо обработать showRequest
// После получения данных с сервера - диспачте showSuccess
// В случае ошибки showSuccess

// На забудьте вызвать метод next.

import {show} from '../api';
import {showRequest, showSuccess, showFailure} from '../actions/show';

export default  store => next => action => {
	if(action.type === showRequest.toString()){
		show(action.payload)
			.then((data) => {
				store.dispatch(showSuccess(data))
			})
			.catch((error)=> {
				store.dispatch(showFailure(error))
			})
	}
	return next(action);
};

