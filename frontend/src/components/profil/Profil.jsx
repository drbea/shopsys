import React, { useState, useEffect } from "react";

const Profil = () => {
    const [user, setUser] = useState({
        email: "",
        nom: "",
        prenom: "",
        password: "",
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        localStorage.setItem("user", JSON.stringify(user));
        setEditMode(false);
    };

    return (
        <div>
            <h2>Profil Utilisateur</h2>
            {editMode ? (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Nom:</label>
                        <input
                            type="text"
                            name="nom"
                            value={user.nom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Prénom:</label>
                        <input
                            type="text"
                            name="prenom"
                            value={user.prenom}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <div>
                    <p>Email: {user.email}</p>
                    <p>Nom: {user.nom}</p>
                    <p>Prénom: {user.prenom}</p>
                    <p>Mot de passe: ******</p>
                    <button onClick={() => setEditMode(true)}>Modifier</button>
                </div>
            )}
        </div>
    );
};

export default Profil;
