import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Watch from './pages/Watch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StylesProvider } from './context/StylesContext';
import HorizontalVideo from './components/Video/HorizontalVideo.module.css';
import VerticalVideo from './components/Video/VerticalVideo.module.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <StylesProvider styles={VerticalVideo}>
            <Home />
          </StylesProvider>
        ),
      },
      {
        path: '/videos/:q',
        element: (
          <StylesProvider styles={VerticalVideo}>
            <Search />
          </StylesProvider>
        ),
      },
      {
        path: '/videos/watch/:videoId',
        element: (
          <StylesProvider styles={HorizontalVideo}>
            <Watch />
          </StylesProvider>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
