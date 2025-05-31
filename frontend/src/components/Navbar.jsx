import React from 'react';
import { FaUserCircle, FaCog } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.leftIcons}>
                <FaCog size={24} style={styles.icon} />
            </div>
            <div style={styles.center}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    style={styles.searchInput}
                />
            </div>
            <div style={styles.rightIcons}>
                <FaUserCircle size={28} style={styles.icon} />
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        padding: '0 16px',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'relative',
    },
    leftIcons: {
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
    },
    rightIcons: {
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        color: '#333',
        margin: '0 8px',
        cursor: 'pointer',
    },
    searchInput: {
        width: 250,
        padding: '8px 12px',
        borderRadius: 20,
        border: '1px solid #ddd',
        outline: 'none',
        fontSize: 16,
    },
};

export default Navbar;