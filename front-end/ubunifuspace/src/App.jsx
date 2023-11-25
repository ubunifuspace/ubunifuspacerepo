import React from 'react'
import { Homepage, Login, SignUp } from './pages'
import './app.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <Homepage />,
  },
]);

const App = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  )
}

export default App