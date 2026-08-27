import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login.jsx'
import Register from './features/auth/pages/Register.jsx'
import Protected from './features/auth/components/Protected.jsx'
import Home from './features/Home/pages/Home.jsx'
const router=createBrowserRouter([
    {
        path:'/dashboard',
        element:<Protected><Home/></Protected>
    },
    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    }
])

export default router