import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { addIdPostReducer } from './addIdPostReducer';
import { addListPost } from './addListPost';
import { setTagPost } from './setTagPost';

const rootReducer = combineReducers({
  user: userReducer,
  idPosted: addIdPostReducer,
  listPost: addListPost,
  tagsPost: setTagPost
});

export default rootReducer;
