import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import TryOnApp from "./TryOnApp";
import DressRecommendationsForm from "./DressRecommendationsForm";
import UploadImages from "./UploadImages";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true); // Start with login screen

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleSignup = () => {
        setShowLogin(true); // After signup, show login form
    };

    return (
        <Router>
            <Routes>
                {!isLoggedIn ? (
                    <Route
                        path="*"
                        element={
                            showLogin ? (
                                <Login onLogin={handleLogin} toggleSignup={() => setShowLogin(false)} />
                            ) : (
                                <Signup onSignup={handleSignup} toggleLogin={() => setShowLogin(true)} />
                            )
                        }
                    />
                ) : (
                    <>
                        <Route path="/" element={<TryOnApp />} />
                        <Route path="/upload-images" element={<UploadImages />} />
                        <Route path="/dress-recommendation" element={<DressRecommendationsForm />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
