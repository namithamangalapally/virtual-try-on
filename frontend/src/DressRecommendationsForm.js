import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenderSelection = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState("male");
    const maleMeasurements = ["shoulder", "chest", "waist", "hips", "height"];
    const femaleMeasurements = ["bust", "waist", "hips", "shoulder", "height"];
    
    const [measurements, setMeasurements] = useState(
        Object.fromEntries(maleMeasurements.map(key => [key, '']))
    );

    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setGender(selectedGender);
        setMeasurements(Object.fromEntries(
            (selectedGender === "male" ? maleMeasurements : femaleMeasurements).map(key => [key, ''])
        ));
    };

    const handleMeasurementChange = (event) => {
        const { name, value } = event.target;
        setMeasurements(prevMeasurements => ({
            ...prevMeasurements,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        navigate("/dress-recommendation", { state: { gender, measurements } });
    };

    const maleClothing = ["Casual", "Formal", "Sporty", "Streetwear"];
    const femaleClothing = ["Casual", "Chic", "Bohemian", "Elegant"];
    const colorOptions = {
        male: ["Blue", "Black", "White", "Neutral"],
        female: ["Pink", "Pastel", "Neutral", "Bold"],
    };
    const occasionOptions = ["Work", "Party", "Casual", "Gym", "Date", "Evening", "Brunch"];
    const fitOptions = {
        male: ["Slim", "Regular", "Loose"],
        female: ["Fitted", "Flowing", "Tailored", "Oversized"],
    };
    const regionOptions = ["USA", "Italy", "Japan", "France", "India", "Korea"];

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Choose Preferences</h2>

            <div style={styles.optionsWrapper}>
                <div style={{ ...styles.optionContainer, backgroundColor: "#FFEBEE" }}>
                    <label style={styles.label}>Select Gender:</label>
                    <select style={styles.select} value={gender} onChange={handleGenderChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                {Object.keys(measurements).map((key) => (
                    <div key={key} style={{ ...styles.optionContainer, backgroundColor: "#E3F2FD" }}>
                        <label style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                        <input 
                            style={styles.input} 
                            type="text" 
                            name={key} 
                            placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} (e.g. 34)`}
                            value={measurements[key]}
                            onChange={handleMeasurementChange}
                        />
                    </div>
                ))}

                <div style={{ ...styles.optionContainer, backgroundColor: "#E8F5E9" }}>
                    <label style={styles.label}>Style Preference:</label>
                    <select style={styles.select}>
                        {(gender === "male" ? maleClothing : femaleClothing).map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div style={{ ...styles.optionContainer, backgroundColor: "#FFF3E0" }}>
                    <label style={styles.label}>Occasion:</label>
                    <select style={styles.select}>
                        {occasionOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div style={{ ...styles.optionContainer, backgroundColor: "#F3E5F5" }}>
                    <label style={styles.label}>Color Preference:</label>
                    <select style={styles.select}>
                        {colorOptions[gender].map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div style={{ ...styles.optionContainer, backgroundColor: "#FBE9E7" }}>
                    <label style={styles.label}>Fit Preference:</label>
                    <select style={styles.select}>
                        {fitOptions[gender].map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>

                <div style={{ ...styles.optionContainer, backgroundColor: "#E0F7FA" }}>
                    <label style={styles.label}>Region/Country Style:</label>
                    <select style={styles.select}>
                        {regionOptions.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button style={styles.submitButton} onClick={handleSubmit}>
                Get Recommendations
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/images/clothRec.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    optionsWrapper: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        maxWidth: "600px",
    },
    optionContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        width: "100%",
        maxWidth: "500px",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    label: {
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "left",
        color: "#333",
    },
    input: {
        width: "96%",
        padding: "9px",
        marginTop: "5px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    select: {
        width: "100%",
        padding: "10px",
        marginTop: "5px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
    },
    submitButton: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
};

export default GenderSelection;