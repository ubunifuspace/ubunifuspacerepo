import React from 'react'
import { Homepage, Login, SignUp } from './pages'
import './app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
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
    <RouterProvider router={router} />
  )
}

export default App