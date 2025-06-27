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
import { authRoutes } from '../modules/auth/routes/routes';
import { sessionRoutes } from '../modules/sessions/routes/routes';
import { userRoutes } from '../modules/user/routes/routes';
import { dashboardRoutes } from '../modules/dashboard/routes/routes';




const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
       ...authRoutes,
       ...sessionRoutes,
       ...userRoutes,
       ...dashboardRoutes,
       { path:'*', element:<NotFoundPage/>},
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
