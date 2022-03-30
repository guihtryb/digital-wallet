import { combineReducers } from 'redux';
import userReducer from './userReducer';
import walletReducer from './walletReducer';

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default rootReducer;
