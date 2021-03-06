import { useRoutes } from 'react-router-dom';
// layouts

import Homepage from './views/Home/homepage';
import ListPostTravel from './views/Travel/ListPostTravel';
import ListPost from './views/Home/ListPost';
import ListFood from './views/Food/ListFood';
import ListBeauty from './views/Beauty/ListBeauty';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Messages from './views/Messages';
import { App } from './views/Messages';
import Profile from './views/Profile/Profile';
import {
  Posts,
  FriendRequests,
  Friends,
  Photos
} from './views/Profile/Profile';
import { NoMessage } from './views/Messages';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Homepage />,
      children: [
        { path: '/', element: <ListPost /> },
        { path: 'travel', element: <ListPostTravel /> },
        { path: 'food', element: <ListFood /> },
        { path: 'beauty', element: <ListBeauty /> }
      ]
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/messages/',
      element: <Messages />,
      children: [
        { path: '', element: <NoMessage /> },
        { path: ':userId/', element: <App /> }
      ]
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/profile=:userId/',
      element: <Profile />,
      children: [
        { path: '', element: <Posts /> },
        { path: 'photos', element: <Photos /> },
        { path: 'friends', element: <Friends /> },
        { path: 'friends/requests', element: <FriendRequests /> }
      ]
    }
  ]);
}
