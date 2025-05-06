import React, { useState } from "react";

function Signup({ onSignup, toggleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Signup failed');

            setSuccess('Signup successful! You can now log in.');
            setError('');
            onSignup(); // move to login screen
        } catch (err) {
            setError(err.message);
            setSuccess('');
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
                padding: '18px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
                <form onSubmit={handleSignup}>
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
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        Sign Up
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Already have an account?{" "}
                    <button onClick={toggleLogin} style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer' }}>
                        Log In
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Signup;
