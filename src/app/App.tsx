import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import Login from '../modules/auth/pages/Login';
import SignUpPage from '../modules/auth/pages/SignUp';
import SessionsPage from '../modules/sessions/pages/Sessions';
import SessionPage from '../modules/sessions/pages/Session';
import { ProtectedRoute } from '../shared/ui/ProtectedRoute';
import Profile from '../modules/user/pages/Profile';
import UpComingSessionsPage from '../modules/sessions/pages/UpComing';
import { Toaster } from 'react-hot-toast';




const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path:'*', element:<NotFoundPage/>},
      { path:'/login', element: <Login/>},
      { path: '/signUp', element: <SignUpPage/>},
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:id', element: <SessionPage /> },
      { path: '/profile', 
        element:
      <ProtectedRoute>
        <Profile/>
      </ProtectedRoute>
      },
        { path: '/upcoming', 
        element:
      <ProtectedRoute>
        <UpComingSessionsPage/>
      </ProtectedRoute>
      }
 
    ],
  },
]);

function App() {
  
  return (
   
    <>
      <RouterProvider router={Router} />
      <Toaster position='top-center' reverseOrder={false} />
    </>
  
  
  );
}

export default App;
