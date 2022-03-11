let listPost = [];

export const addListPost = (state = listPost, action) => {
  switch (action.type) {
    case 'listPost/addListPost':
      return { ...state, items: [...action.payload] };
    case 'listPost/addOnePost':
      return { ...state, items: [action.payload, ...state.items] };
    default:
      return state;
  }
};
