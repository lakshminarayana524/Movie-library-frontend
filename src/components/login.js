import React, { useState, useEffect } from 'react';
import './styles/login.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from './loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/dashboard'); // Redirect to dashboard if logged in
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`https://movie-library-backend-kxe0.onrender.com/login`, { email, password })
            .then((res) => {
                if (res.data.msg !== 'Login Successful') {
                    setMsg(res.data.msg);
                    toast.error(res.data.msg); // Display error toast
                } else {
                    console.log("Login Successful");
                    navigate('/dashboard');
                }
            })
            .catch(err => {
                console.error("Login failed:", err);
                toast.error('Login failed'); // Display error toast
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <div className='login-body'>
            <div className='login-container'>
                <div className='login-content'>
                    <div className='login-form'>
                        <div className='login-head'>
                            <h1>Login</h1>
                        </div>
                        <div className="login-input">
                            <input type='email' name="Email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="login-input">
                            <input type='password' name="Password" placeholder='Password' value={password} onKeyDown={handleEnter} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login-text'>
                            <p>Please <span className='login-text-span' onClick={handleSignup}>Signup</span>?</p>
                        </div>
                        <div className="login-button">
                            <button onClick={handleSubmit} disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                        </div>
                        <div className={`login-error ${msg ? 'blink' : ''}`}>
                            {msg && <p className="error-message">{msg}</p>}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
