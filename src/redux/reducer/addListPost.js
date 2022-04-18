let listPost = [];

export const addListPost = (state = listPost, action) => {
  switch (action.type) {
    case 'listPost/addListPost':
      return { ...state, items: [...action.payload] };
    case 'listPost/addOnePost':
      return { ...state, items: [action.payload, ...state.items] };
    case 'listPost/addMorePost':
      //concat new list post when fetch more
      return { ...state, items: [...state.items.concat(action.payload)] }; 
    default:
      return state;
  }
};
