import { combineReducers } from 'redux';
import orderReducer from './order';
import saleReducer from './sale';
import userReducers from './user';

const rootReducer = combineReducers({
  user: userReducers,
  order: orderReducer,
  sale: saleReducer,
});

export default rootReducer;
