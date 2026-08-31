import axios from 'axios'
const api=axios.create({
    
    withCredentials:true
})

export async function register({username,email,password}) {
    const response=await api.post('/api/auth/register',{
        email, username,password
    })    
    return response.data
}

export async function login({email,password,username}){
    const response =await api.post('/api/auth/login',{
        email,password,username
    })
    return response.data
}

export async function getMe(){
    const response=await api.get('/api/auth/get-me')
    return response.data
}

export async function  logOut(params) {
   const response=await api.get('/api/auth/logout')
   return response.data 
}