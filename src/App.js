import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Search from './pages/Search';
import Watch from './pages/Watch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/videos/:q',
        element: <Search />, //pass props of search query
      },
      {
        path: '/videos/watch/:videoId',
        element: <Watch />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
