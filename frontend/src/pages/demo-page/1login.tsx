import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPages = () =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin =() =>{
        if (email == 'user@mail.com' && password === 'password'){
            navigate('/home')
        } else{
            alert('invalid credentials')
        }
    };
    return (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      );
}

export default LoginPages;