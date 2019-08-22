import { createStore, applyMiddleware} from 'redux';
import reducers from "./reducers";
import searchMiddleware from './middlewares/searchMiddleware';

export default (initialState) => {
	return createStore(reducers, initialState, applyMiddleware(searchMiddleware))
}


