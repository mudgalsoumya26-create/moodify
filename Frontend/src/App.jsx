import React from 'react'
import { RouterProvider } from 'react-router'
import router from './app.route.jsx'
import './features/shared/styles/global.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongContextProvider } from './features/Home/song.context.jsx'
const App = () => {
   
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router}/>
      </SongContextProvider>
      
    </AuthProvider>
    
    
    
  )
}

export default App
