import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { addIdPostReducer } from './addIdPostReducer';
import { addListPost } from './addListPost';
import { addListPostProfile } from './addListPostProfile';
import { setTagPost } from './setTagPost';

const rootReducer = combineReducers({
  user: userReducer,
  idPosted: addIdPostReducer,
  listPost: addListPost,
  listPostProfile: addListPostProfile,
  tagsPost: setTagPost
});

export default rootReducer;
