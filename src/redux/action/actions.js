export const addIdPost = (data) => ({
  type: 'post/addIdPost',
  payload: data
});

export const getUser = (data) => ({
  type: 'user/getUser',
  payload: data
});

export const addListPost = (data) => ({
  type: 'listPost/addListPost',
  payload: data
});

export const addListPostProfile = (data) => ({
  type: 'listPost/addListPostProfile',
  payload: data
});

export const addOnePostProfile = (data) => ({
  type: 'listPost/addOnePostProfile',
  payload: data
});

export const addOnePost = (data) => ({
  type: 'listPost/addOnePost',
  payload: data
});

export const addMorePost = (data) => ({
  type: 'listPost/addMorePost',
  payload: data
});

export const setTagPost = (data) => ({
  type: 'post/setTagPost',
  payload: data
});
