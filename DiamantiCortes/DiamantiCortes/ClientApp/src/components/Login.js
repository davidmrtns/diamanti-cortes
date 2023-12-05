import style from "./Login.module.css";
import React, { Component, useState } from "react";

function Login() {
    const [enviado, setEnviado] = useState(null);

    function enviar(e) {
        if (e.keyCode === 13) {
            enviarSolicitacao();
        }
    }

    async function enviarSolicitacao() {
        setEnviado(true);

        var resultado;
        var usuario = document.getElementById("usuario").value;
        var senha = document.getElementById("senha").value;

        if (usuario && senha) {
            try {
                await fetch('api/autenticar', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: usuario,
                        senha: senha
                    })
                }).then((response) => response.json())
                    .then((data) => { resultado = data });

                if (resultado) {
                    window.location.href = "/";
                } else {
                    alert('O usuário ou senha inseridos não existem');
                    setEnviado(false);
                }
            } catch {
                alert('Um erro ocorreu');
                setEnviado(false);
            }
        } else {
            alert('Digite um nome de usuário e senha válidos!');
            setEnviado(false);
        }
    }

    return (
        <div className={style.containerlogin}>
            <div className={style.login}>
                <h1>Login</h1>
                <input id="usuario" type="text" placeholder="Usuário" onKeyDown={(e) => enviar(e)} />
                <br /><br />
                <input id="senha" type="password" placeholder="Senha" onKeyDown={(e) => enviar(e)} />
                <br /><br />
                <button disabled={enviado} onClick={() => enviarSolicitacao()}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;