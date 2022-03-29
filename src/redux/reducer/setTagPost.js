let tagsPost = [];

export const setTagPost = (state = tagsPost, action) => {
  switch (action.type) {
    case 'post/setTagPost':
      return { ...action.payload };
    default:
      return state;
  }
};
