import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/Home.tsx';
import SessionsPage from './pages/Sessions.tsx';
import SessionPage from './pages/Session.tsx';
import Root from './pages/Root.tsx';
import { BookingContextProvider } from './contexts/bookingContext.tsx';
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
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:id', element: <SessionPage /> },
 
    ],
  },
]);

function App() {
  
  return (
    <BookingContextProvider>
      <RouterProvider router={Router} />
      <Toaster position='top-center' reverseOrder={false} />
    </BookingContextProvider>
  );
}

export default App;
