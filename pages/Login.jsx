import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserLogin.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        let users = [];

        try {
            const storedUsers = localStorage.getItem('users');
            users = storedUsers ? JSON.parse(storedUsers) : [];
        } catch {
            setError('Account data is invalid. Please register again.');
            return;
        }

        if (!Array.isArray(users)) {
            setError('Account data is invalid.');
            return;
        }

        const user = users.find(
            (account) =>
                account.username.toLowerCase() === username.trim().toLowerCase() &&
                account.password === password
        );

        if (!user) {
            setError('Invalid username or password.');
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify({
            username: user.username
        }));

        navigate('/home');
    };

    return (
        <div className="box-login">
            <div className="user-login">

                <h2>SPHEREBOUND</h2>
                <p>Welcome back, explorer!</p>

                <form onSubmit={handleLogin}>

                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    <button type="submit" className="user-btn">
                        Log In
                    </button>

                </form>

                <p>New to Spherebound?</p>

                <button
                    type="button"
                    onClick={() => navigate('/register')}
                >
                    Sign Up
                </button>

            </div>
        </div>
    );
};

export default Login;
