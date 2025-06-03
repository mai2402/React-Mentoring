import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Root from './pages/Root.tsx';
import { BookingContextProvider } from './contexts/bookingContext.tsx';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/DashBoard.tsx';
import { AuthContextProvider } from './contexts/authContext.tsx';
import { ProtectedRoute } from './components/shared/ProtectedRoute.tsx';




const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:id', element: <SessionPage /> },
      { path: '/dashboard', 
        element:
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
      }
 
    ],
  },
]);

function App() {
  
  return (
    <AuthContextProvider>
    <BookingContextProvider>
      <RouterProvider router={Router} />
      <Toaster position='top-center' reverseOrder={false} />
    </BookingContextProvider>
    </AuthContextProvider>
  );
}

export default App;
