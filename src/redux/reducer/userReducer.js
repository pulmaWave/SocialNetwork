const user = {
  id: 0,
  email: '',
  phone: '',
  name: '',
  username: ''
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case 'user/getUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
