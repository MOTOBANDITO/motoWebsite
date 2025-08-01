import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import Layout from './Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/shopPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { UnlockSongPage } from './pages/UnlockSongPage.jsx';
import { VideoPage } from './pages/VideoPage.jsx';
import { MusicPage } from './pages/MusicPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, // This makes HomePage the default for "/"
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "contact",
        element: <ContactPage/>
      },
      {
        path: "videos",
        element: <VideoPage/>
      },
      { 
        path: "about", 
        element: <AboutPage/> 
      },
      {
        path: "unlock",
        element: <UnlockSongPage/>
      },
      {
        path: "music",
        element: <MusicPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);