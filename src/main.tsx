import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import './styles/main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthContextProvider } from './core/store/authContext.tsx';
import App from './app/App.tsx';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
       <AuthContextProvider>
         <App />
       </AuthContextProvider>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)



