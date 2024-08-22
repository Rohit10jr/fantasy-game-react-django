import React, {useState} from 'react';
import {useAsyncError, useNavigate} from 'react-router-dom';

const RegistrationPage = () =>{
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister =() =>{
        alert(`Registered with email: ${email}`);
        navigate('/login');
    }

    return (
        <div>
          <h2>Register</h2>
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
          <button onClick={handleRegister}>Register</button>
        </div>
      );
}


export default RegistrationPage;