import { Outlet, createHashRouter } from 'react-router-dom'
import { SignInPage } from '../pages/SignIn'
import { SignUpPage } from '../pages/SignUp'
import { HomePage } from '../pages/Home'
import { RootPage } from '../pages/Root'
import { GamePage } from '../pages/Game'

export const router = createHashRouter([
  { path: '/', element: <RootPage /> },
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/sign_in',
        element: <SignInPage />,
      },
      {
        path: '/sign_up',
        element: <SignUpPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/game',
        element: <GamePage />,
      }
    ],
  },
])
