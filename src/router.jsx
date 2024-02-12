import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import User from "./views/User.jsx";
import About from "./views/About.jsx";
import Conatct from "./views/Contact.jsx";
import Home from "./views/Home.jsx";
import Dashboard from "./views/Dashboard.jsx";
import AdminLayout from "./components/AdminLayout.jsx";

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin',
        element: <Home />
      },
      {
        path: '/admin/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/admin/users/:id',
        element: <UserForm key="userUpdate" />
      },
      {
        path: '/admin/dashboard',
        element: <Dashboard />
      }, {
        path: '/admin/about',
        element: <About />
      },
      {
        path: '/admin/contact',
        element: <Conatct />
      },
      {
        path: '/admin/usersDetails/:id',
        element: <User />
      }
    ]
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/usersDetails/:id',
        element: <User />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Conatct />
      },
      {
        path: '/users',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default router;
