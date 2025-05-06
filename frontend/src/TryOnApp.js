import React from "react";
import { useNavigate } from "react-router-dom";

function TryOnApp() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <div style={styles.mainContainer}>
                {/* Virtual Try-On Box */}
                <div style={styles.box}>
                    <h2 style={styles.sectionTitle}>Virtual Try-On</h2>
                    
                    <button 
                        onClick={() => navigate("/upload-images")} 
                        style={{ ...styles.button, backgroundColor: "#ff4081", width: "100%" }}
                    >
                        Try On
                    </button>
                </div>

                {/* Clothing Recommendations Box */}
                <div style={styles.box}>
                    <h2 style={styles.sectionTitle}>Clothing Recommendations</h2>
                    <button 
                        onClick={() => navigate("/dress-recommendation")} 
                        style={{ ...styles.button, backgroundColor: "#2196F3", width: "100%" }}
                    >
                        Get Recommendations
                    </button>
                </div>
            </div>
        </div>
    );
}

// Styles
const styles = {
    container: {
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "url(/images/clothImg.avif) center/cover no-repeat fixed",
        padding: "20px",
    },
    mainContainer: {
        display: "flex",
        gap: "20px",
        justifyContent: "center",
        alignItems: "stretch",
        flexWrap: "wrap", // Ensures wrapping on smaller screens
        width: "90%",
        maxWidth: "900px",
    },
    box: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        flex: "1", // Makes both boxes take equal width
        minWidth: "280px", // Ensures responsiveness
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    button: {
        padding: "12px 15px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        transition: "0.3s",
    },
};

export default TryOnApp;
