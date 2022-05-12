let friends = [];

export const addFriendsReducer = (state = friends, action) => {
  switch (action.type) {
    case 'friends/addFriends':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
