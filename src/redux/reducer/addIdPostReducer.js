let idPosted = { id: '' };

export const addIdPostReducer = (state = idPosted, action) => {
  switch (action.type) {
    case 'post/addIdPost':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
