import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/homePage.jsx'
import './index.css'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import About from './pages/about.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element : <Login />,
  },
  {
    path: "/register",
    element : <Register />,
  },
  {
    path: "/about",
    element: <About />,
  },
  // Route untuk halaman 404
  {
    path: "*",
    element: <h1>404 Not Found</h1>,
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
