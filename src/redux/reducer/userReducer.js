const user = [];

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case 'user/getUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
