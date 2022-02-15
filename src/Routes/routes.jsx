import React from 'react';
import { Navigate } from 'react-router-dom';
const LoginPage = React.lazy(() => import('../Pages/Auth/LoginPage/LoginPage'));
const SignupPage = React.lazy(() =>
  import('../Pages/Auth/SignupPage/SignupPage')
);
const BlogListPage = React.lazy(() =>
  import('../Pages/Blogs/BlogListPage/BlogListPage')
);
const BlogDetailsPage = React.lazy(() =>
  import('../Pages/Blogs/BlogDetailPage/BlogDetailPage')
);
const PrivateLayout = React.lazy(() => import('./PrivateLayout'));

const ROUTES = [
  {
    element: <Navigate replace to='/login' />,
    path: '/',
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        element: <BlogListPage />,
        path: '/blogs',
      },
      {
        element: <BlogDetailsPage />,
        path: '/blogs/:id',
      },
    ],
  },
  {
    element: <div>Page Not Found !</div>,
    path: '*',
  },
];

export default ROUTES;
