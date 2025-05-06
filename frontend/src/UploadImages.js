import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadImages() {
    const navigate = useNavigate();
    const [userImage, setUserImage] = useState(null);
    const [garmentImage, setGarmentImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);

    const handleFileChange = (e, setImage) => {
        const file = e.target.files[0];
        if (file) setImage(URL.createObjectURL(file));
    };

    const handleTryOn = async () => {
        const userFile = document.getElementById("userFile").files[0];
        const garmentFile = document.getElementById("garmentFile").files[0];

        if (!userFile || !garmentFile) return alert("Please upload both images before trying on.");

        try {
            const formData = new FormData();
            formData.append("user_image", userFile);
            formData.append("garment_image", garmentFile);

            const response = await axios.post("http://127.0.0.1:5000/tryon", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                responseType: "blob",
            });

            setResultImage(URL.createObjectURL(response.data));
        } catch (error) {
            console.error("Error processing try-on:", error);
            alert("Failed to process try-on. Please try again.");
        }
    };

    useEffect(() => {
        return () => [userImage, garmentImage, resultImage].forEach(img => img && URL.revokeObjectURL(img));
    }, [userImage, garmentImage, resultImage]);

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.sectionTitle}>Upload Images</h2>
                
                <input id="userFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setUserImage)} hidden />
                <input id="garmentFile" type="file" accept="image/*" onChange={(e) => handleFileChange(e, setGarmentImage)} hidden />

                <div style={styles.buttonContainer}>
                    <button onClick={() => document.getElementById("userFile").click()} style={styles.button}>Upload User Image</button>
                    <button onClick={() => document.getElementById("garmentFile").click()} style={styles.button}>Upload Garment Image</button>
                </div>

                <div style={styles.imageContainer}>
                    {userImage && <img src={userImage} alt="User" style={styles.image} />}
                    {garmentImage && <img src={garmentImage} alt="Garment" style={styles.image} />}
                </div>

                <button onClick={handleTryOn} style={{ ...styles.button, backgroundColor: "#ff4081", width: "100%" }}>Try On</button>

                {resultImage && <img src={resultImage} alt="Result" style={styles.resultImage} />}
                
                <button onClick={() => navigate("/")} style={{ ...styles.button, backgroundColor: "#757575", width: "100%", marginTop: "10px" }}>
                    Back to Home
                </button>
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
        background: "url(/images/bgimage.webp) center/cover no-repeat fixed",
        padding: "20px",
    },
    box: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        width: "100%",
        maxWidth: "500px",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    buttonContainer: { display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "10px" },
    button: {
        flex: 1,
        padding: "12px 15px",
        cursor: "pointer",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        transition: "0.3s",
    },
    imageContainer: { display: "flex", justifyContent: "center", gap: "10px", marginBottom: "10px" },
    image: { maxWidth: "100px", borderRadius: "10px" },
    resultImage: { maxWidth: "300px", margin: "20px auto", borderRadius: "10px" },
};

export default UploadImages;
