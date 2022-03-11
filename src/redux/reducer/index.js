import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { addIdPostReducer } from './addIdPostReducer';
import { addListPost } from './addListPost';

const rootReducer = combineReducers({
  user: userReducer,
  idPosted: addIdPostReducer,
  listPost: addListPost
});

export default rootReducer;
