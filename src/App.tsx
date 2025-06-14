import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Root from './pages/Root.tsx';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './contexts/authContext.tsx';
import { ProtectedRoute } from './components/shared/ProtectedRoute.tsx';
import NotFoundPage from './pages/NotFound.tsx';
import Profile from './pages/Profile.tsx';
import Login from './pages/Login.tsx';
import UpComingSessionsPage from './pages/UpComing.tsx';




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
    <AuthContextProvider>
    
      <RouterProvider router={Router} />
      <Toaster position='top-center' reverseOrder={false} />
  
    </AuthContextProvider>
  );
}

export default App;
