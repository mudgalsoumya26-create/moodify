import React,{useState} from 'react';
import '../style/login.scss';
import FormGroup from '../components/FormGroup.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router';
const Login = () => {
    const {loading,handleLogin}=useAuth();
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const nav=useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({email,password})
        nav('/dashboard')
    }


    return (
        <main className="login_page">
            <section className="formContainer">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <FormGroup value={email} onChange={(e)=>setemail(e.target.value)} label="Email" placeholder="you@example.com" />
                    <FormGroup value={password} onChange={(e)=>setpassword(e.target.value)} label="Password" placeholder="Enter your password" />

                    <button type="submit">Login</button>
                </form>

                <p className="register_text">
                    Don't have an account?
                    <a href="/register">Register</a>
                </p>
            </section>
        </main>
    );
};

export default Login;