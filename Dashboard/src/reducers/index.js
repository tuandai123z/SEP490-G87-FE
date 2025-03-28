import { combineReducers } from 'redux';
import orderReducer from './order';
import orderReturnReducer from './orderReturn';
import saleReducer from './sale';
import userReducers from './user';

const rootReducer = combineReducers({
  user: userReducers,
  order: orderReducer,
  orderReturn: orderReturnReducer,
  sale: saleReducer,
});

export default rootReducer;
