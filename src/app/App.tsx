import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import { authRoutes } from '../modules/auth/routes/routes';
import { sessionRoutes } from '../modules/sessions/routes/routes';
import { userRoutes } from '../modules/user/routes/routes';
import { dashboardRoutes } from '../modules/dashboard/routes/routes';
import NotAuthorizedPage from './pages/NotAuthorized';
import RestrictedToRole from '../modules/auth/components/RestrictedToRole';
import { UserRole } from '../modules/user/enums/users';
import { AppRoute } from './enums/routes';






const Router = createBrowserRouter([
  {
    path: AppRoute.Home,
    element: <Root />,
    children: [
      {
        index: true,
        element: <RestrictedToRole blockedRoles={[UserRole.ADMIN]}>
                 <HomePage/>
                </RestrictedToRole> ,
      },
       ...authRoutes,
       ...sessionRoutes,
       ...userRoutes,
       ...dashboardRoutes,
 
    ],
  },
  { path:AppRoute.NotFound, element:<NotFoundPage/>},
  {path: AppRoute.Unauthorized  , element:<NotAuthorizedPage/>},
  
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
