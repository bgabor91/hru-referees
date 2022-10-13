import { Navigate, useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Matches from './pages/Matches'
import ProfilePage from './pages/Profile'
import ProfileEditPage from './pages/ProfileEdit'
import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'
import ProtectedRoute from './components/protectedRoute'
import Calendar from './pages/Calendar'
import Referees from './pages/Referees'
import Events from './pages/Events'

const Router = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/merkozesek',
      element: <Matches />,
    },
    {
      path: '/esemenyek',
      element: <Events />,
    },
    {
      path: '/jatekvezetok',
      element: <Referees />,
    },
    {
      path: '/profil',
      element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
    },
    {
      path: '/profil-szerkesztes',
      element: <ProtectedRoute><ProfileEditPage /></ProtectedRoute>,
    },
    {
      path: '/belepes',
      element: <LoginPage />,
    },
    {
      path: '/regisztracio',
      element: <RegisterPage />,
    },
    {
      path: '/jv-elerhetoseg',
      element: <ProtectedRoute><Calendar /></ProtectedRoute>,
    },
    {
      path: '*',
      element: <Navigate to='/' replace />,
    }
  ])
  return routes
}
export default Router
