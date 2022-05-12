let popup = [];

export const setPopUpReducer = (state = popup, action) => {
  switch (action.type) {
    case 'setPopUp':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
