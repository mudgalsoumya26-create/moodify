import { register,login,getMe,logOut } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { useEffect} from "react";
export function useAuth(){
    const context=useContext(AuthContext)
    const {user,setuser,loading,setloading}=context

    async function handleRegister({username,email,password}){
        setloading(true);
       try{ const data=await register({username,email,password})
        setuser(data.user)}
        catch{
             setuser(null);
        }
        finally{setloading(false)}
    }

     async function handleLogin({username,email,password}){
        setloading(true);
        try{const data=await login({username,email,password})
        setuser(data.user)}
        catch{
             setuser(null);
        }

        finally{setloading(false)}
    }
     async function handleGetMe(){
        setloading(true);
        try{ const data=await getMe()
        setuser(data.user)
      }catch{
        setuser(null);
      }
       finally{ setloading(false)}
    }
     async function handleLogout(){
        setloading(true);
        const data=await logOut()
        setuser(null)
        setloading(false)
    }

    useEffect(() => {
      handleGetMe()
    
    }, [])
    

    return ({
        user,loading,handleGetMe,handleLogin,handleLogout,handleRegister
    })
}
