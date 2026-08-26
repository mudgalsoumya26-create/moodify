import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Protected = ({children}) => {
    const {user,loading}=useAuth()
    const nav=useNavigate();
    if(loading){
       return <h1>Loading...</h1>
    }
    if(!loading && !user){
       return <Navigate to="/login" />
    }
    
  return (
    children
  )
}

export default Protected