let listPostProfile = [];

export const addListPostProfile = (state = listPostProfile, action) => {
  switch (action.type) {
    case 'listPost/addListPostProfile':
      return { ...state, items: [...action.payload] };
    case 'listPost/addOnePostProfile':
      return { ...state, items: [action.payload, ...state.items] };
    default:
      return state;
  }
};
