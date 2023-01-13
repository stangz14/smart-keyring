import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//contens
import Login from './Contents/Login'
import Profile from './Contents/Profile'
import Register from './Contents/rigister'
import Index from './Contents/index'
import Accident from './Contents/Accident'
import Policy from './Contents/policy'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/accident",
    element: <Accident />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Index />,
  }, {
    path: "/policy",
    element: <Policy />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
