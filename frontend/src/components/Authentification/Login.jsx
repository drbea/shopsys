


function Login(){
    return(
        
        <div>
            <h1>LOGIN</h1>
             <div>
            <input className="border rounded" type="mail" placeholder="Email" />
            </div>
            <div>
            <input className="border rounded" type="password" placeholder="Mot_de_passe" />
            </div>
            <button className="border rounded">Se connecter</button>
        </div>
    )
}
export default Login;