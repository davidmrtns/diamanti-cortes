import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Login from '../components/Login';

function PrivateRoute() {
    const [logado, setLogado] = useState(null);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var resposta;

                await fetch('api/validar', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });

                setLogado(resposta);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        buscarDados();
    }, []);

    function renderizar() {
        if (logado) {
            return (
                <Outlet />
            );
        } else {
            return (
                <Login />
            );
        }
    }

    return (
        <div id="conteudogeral">
            {renderizar()}
        </div>
    );
}

export default PrivateRoute;