import style from "./Login.module.css";

function Login() {
    return (
        <div className={style.containerlogin}>
            <div className={style.login}>
                <h1>login</h1>
                <input type="text" placeholder="nome" />
                <br /><br />
                <input type="password" placeholder="senha" /> 
                <br /><br />
                <button>entrar</button>
            </div>
        </div>
    );
}

export default Login;