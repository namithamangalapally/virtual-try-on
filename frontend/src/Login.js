import React, { useState } from "react";

function Login({ onLogin, toggleSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Login failed');

            setError('');
            onLogin(); // successful login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url('https://t3.ftcdn.net/jpg/09/61/27/48/360_F_961274808_fX06eKzHJDCX9LO1Uew8YsL8Gk7RDZBu.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        Login
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Don't have an account?{" "}
                    <button onClick={toggleSignup} style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer' }}>
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;
