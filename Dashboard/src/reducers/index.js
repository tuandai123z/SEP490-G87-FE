import { combineReducers } from 'redux';
import orderReducer from './order';
import userReducers from './user';

const rootReducer = combineReducers({
  user: userReducers,
  order: orderReducer,
});

export default rootReducer;
