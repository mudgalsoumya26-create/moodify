import React,{useState} from 'react';
import { useNavigate } from 'react-router';
import '../style/register.scss';
import FormGroup from '../components/FormGroup.jsx';
import { useAuth } from '../hooks/useAuth.js';
const Register = () => {
    const {loading,handleRegister}=useAuth()
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState('')
    const nav=useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        await handleRegister({username,email,password})
        nav('/dashboard')
    }


    return (
        <main className="register_page">
            <section className="register_container">
                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>
                   <FormGroup value={username} onChange={(e)=>setusername(e.target.value)} label="Username" placeholder="Enter your username" />
                    <FormGroup value={email} onChange={(e)=>setemail(e.target.value)} label="Email" placeholder="you@example.com" />
                    <FormGroup value={password} onChange={(e)=>setpassword(e.target.value)} label="Password" placeholder="Enter your password" />

                    <button type="submit">Register</button>
                </form>

                <p className="login_text">
                    Already have an account?
                    <a href="/">Login</a>
                </p>
            </section>
        </main>
    );
};

export default Register;