import React from "react";
import { FaUserCircle, FaCog } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.center}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    style={styles.searchInput}
                />
                <button style={styles.searchButton}>Rechercher</button>
            </div>
            <div style={styles.icons}>
                <FaUserCircle size={28} style={styles.icon} title="Profil" />
                <FaCog size={28} style={styles.icon} title="Paramètre" />
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        width: "100%",
        height: "60px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        padding: "0 32px",
        position: "relative",
    },
    center: {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
    },
    searchInput: {
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px 0 0 4px",
        outline: "none",
        fontSize: "16px",
    },
    searchButton: {
        padding: "8px 16px",
        border: "none",
        background: "#007bff",
        color: "#fff",
        borderRadius: "0 4px 4px 0",
        cursor: "pointer",
        fontSize: "16px",
    },
    icons: {
        display: "flex",
        alignItems: "center",
        gap: "18px",
        marginLeft: "auto",
    },
    icon: {
        cursor: "pointer",
        color: "#333",
    },
};

export default Navbar;