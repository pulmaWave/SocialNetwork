import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { addIdPostReducer } from './addIdPostReducer';
import { addListPost } from './addListPost';
import { addListPostProfile } from './addListPostProfile';
import { setTagPost } from './setTagPost';
import { addFriendsReducer } from './addFriendsReducer';
import { setPopUpReducer } from './setPopupReducer';

const rootReducer = combineReducers({
  user: userReducer,
  idPosted: addIdPostReducer,
  listPost: addListPost,
  listPostProfile: addListPostProfile,
  tagsPost: setTagPost,
  friends: addFriendsReducer,
  popup: setPopUpReducer
});

export default rootReducer;
