import { Navigate, useRoutes } from 'react-router-dom';
// layouts

import Homepage from './views/Home/homepage';
import ListPostTravel from './views/Travel/ListPostTravel';
import ListPost from './components/Main/ListPost';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Homepage />,
      children: [
        { path: '/', element: <ListPost /> },
        { path: 'travel', element: <ListPostTravel /> }
      ]
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    }
  ]);
}
