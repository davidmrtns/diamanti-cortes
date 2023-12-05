import React, { useState, useEffect } from 'react';
import CardServico from '../CardServico/CardServico';
import style from "../Atendimentos.module.css";

const Servicos = () => {
    const [servicos, setServicos] = useState([]);
    const [buscar, setBuscar] = useState(false);

    async function adicionar() {
        var nomeServico = document.getElementById("nomeServico").value.trim();
        var descricao = document.getElementById("descricao").value.trim();
        var preco = document.getElementById("preco").value.trim();

        if (nomeServico && descricao && preco) {
            var resposta;
            try {
                await fetch('api/inserir-servico', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: "0",
                        nomeServico: nomeServico,
                        descricao: descricao,
                        preco: preco
                    })
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch {
                resposta = null;
            }

            if (resposta) {
                alert("Serviço cadastrado com sucesso");
                atualizar(resposta);
            }
        } else {
            alert("Preencha todos os campos corretamente");
        }
    }

    useEffect(() => {
        const buscarDados = async () => {
            var resposta;

            try {
                await fetch('api/listar-servicos', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            if (resposta) {
                setServicos(resposta);
            }
        }

        buscarDados();
    }, [buscar]);

    const atualizar = (estado) => {
        setBuscar(estado);
    }

    return (
        <div>
            <header>
                <h1>Barbearia Diamanti - Serviços cadastrados</h1>
            </header>
            <section id="cliente-do-dia">
                <div>
                    <input type="text" placeholder="Nome do servico" id="nomeServico" />
                    <input type="text" placeholder="Descrição" id="descricao" />
                    <input type="number" placeholder="Preço" id="preco" />
                    <button onClick={() => adicionar()}>Cadastrar</button>
                </div>
                <div className={style.gaveta + " " + style.servicos}>
                    {servicos ? servicos.map((item) => (
                        <CardServico servico={item} apenasExibicao={true} editavel={true} onAtualizar={atualizar} />
                    )) : <p>Nenhum serviço cadastrado</p>}
                </div>
            </section>
            <footer>
                <p>&copy; 2023 Barbearia Diamanti</p>
            </footer>
        </div>
    );
}

export default Servicos;
