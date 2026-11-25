import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserLogin.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');

        const cleanUsername = username.trim();

        if (cleanUsername.length < 3) {
            setError('Username must be at least 3 characters.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        let users = [];

        try {
            const storedUsers = localStorage.getItem('users');
            users = storedUsers ? JSON.parse(storedUsers) : [];
        } catch {
            setError('Account data is invalid.');
            return;
        }

        if (!Array.isArray(users)) {
            setError('Account data is invalid.');
            return;
        }

        const existingUser = users.find(
            (user) =>
                user.username.toLowerCase() === cleanUsername.toLowerCase()
        );

        if (existingUser) {
            setError('Username already exists.');
            return;
        }

        const newUser = {
            username: cleanUsername,
            password: password
        };

        users.push(newUser);

        try {
            localStorage.setItem('users', JSON.stringify(users));
        } catch {
            setError('Unable to save your account. Please try again.');
            return;
        }

        alert('Account created successfully!');

        navigate('/login');
    };

    return (
        <div className="box-login">
            <div className="user-login">

                <h2>SPHEREBOUND</h2>
                <p>Start your journey, explorer!</p>

                <form onSubmit={handleRegister}>

                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Create a username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Password</label>

                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
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

                    <label>Confirm Password</label>

                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    <button type="submit" className="user-btn">
                        Create Account
                    </button>

                </form>

                <p>Already have an account?</p>

                <button
                    type="button"
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>

            </div>
        </div>
    );
};

export default Register;
