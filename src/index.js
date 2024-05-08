import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import Watch from './pages/Watch';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      {
        path: '/videos/:q',
        element: <Videos />, //pass props of search query
      },
      {
        path: '/videos/watch/:videoId',
        element: <Watch />, //pass props of search query
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
