import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootErrorBoundary from '@/pages/common/components/RootErrorHandler';
import RootSuspense from '@/pages/common/components/RootSuspense';
import ErrorPage from '@/pages/error/components/ErrorPage';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import Home from '@/pages/home';

import { Toaster } from './components/ui/toaster';
import LoginPage from '@/pages/Login';
import SignUpPage from '@/pages/SignUP';
import SignUpCompletePage from '@/pages/SignUpComplete';
import CreatePostPage from '@/pages/Post/CreatePost';
import DetailPostPage from '@/pages/Post/DetailPost';

const pageRoutes = {
  main: '/',
  login: '/login',
  signUp: '/signup',
  signUpComplete: '/signup-complete',
  createPost: '/create-post',
  detailPost: '/post/:id',
};

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
      <Toaster />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.login, element: <LoginPage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.signUp, element: <SignUpPage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.signUpComplete,
        element: <SignUpCompletePage />,
        errorElement: <ErrorPage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.createPost,
        element: <CreatePostPage />,
        errorElement: <ErrorPage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.detailPost,
        element: <DetailPostPage />,
        errorElement: <ErrorPage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
