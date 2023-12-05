import style from "./CardServico.module.css";
import React, { useState } from 'react';
import { faPencil, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CardServico({ servico, onCheckboxChange=null, apenasExibicao=false, editavel=false, onAtualizar=null }) {

    const [selecionado, setSelecionado] = useState(false);
    const [editar, setEditar] = useState(false);

    const selecionar = (event) => {
        setSelecionado(!selecionado);
        handleCheckboxChange(event);
    };

    const handleCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        onCheckboxChange(servico.id, isChecked);
    };

    const atualizar = async () => {
        var confirmar = window.confirm("Você quer mesmo editar esse serviço?");

        if (confirmar) {
            var nomeServico = document.getElementById('nomeServico-' + servico.id).value.trim();
            var descricao = document.getElementById('descricao-' + servico.id).value.trim();
            var preco = document.getElementById('preco-' + servico.id).value.trim();

            try {
                var resposta;
                await fetch('api/editar-servico', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: servico.id,
                        nomeServico: nomeServico,
                        descricao: descricao,
                        preco: preco
                    })
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            if (resposta) {
                alert("Serviço atualizado com sucesso");
                onAtualizar(true);
                setEditar(false);
            }
        }
    }

    const excluir = async () => {
        var confirmar = window.confirm("Você quer mesmo excluir esse serviço? Ele será removido de todos os agendamentos em que estiver");

        if (confirmar) {
            try {
                var resposta;
                await fetch('api/excluir-servico?id=' + servico.id, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            if (resposta) {
                alert("Serviço excluído com sucesso");
                onAtualizar(true);
            }
        }
    }

    const mudarEditar = (estado) => {
        setEditar(estado);
    }

    return (
        <div onClick={apenasExibicao ? null : selecionar} className={style.card} id={"servico-" + servico.id}>
            <div className={style.gaveta}>
                <div>
                    {editar ? <input id={"nomeServico-" + servico.id} type="text" defaultValue={servico.nomeServico} /> : <h1>{servico.nomeServico}</h1>}
                    {editar ? <input id={"descricao-" + servico.id} type="text" defaultValue={servico.descricao}></input> : <p>{servico.descricao}</p>}
                </div>
                <div>
                    {editar ? <input type="text" id={"preco-" + servico.id} defaultValue={servico.preco}></input> : <p>R$ {servico.preco}</p>}
                    {apenasExibicao ? null : <input type="checkbox" checked={selecionado} value={servico.id} />}
                    {editavel ? editar ? <p className={style.acao} onClick={() => mudarEditar(!editar)}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Cancelar edição</p> : <p className={style.acao} onClick={excluir}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Excluir serviço</p> : null}
                    {editavel ? editar ? <p className={style.acao} onClick={() => atualizar()}><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> Salvar edição</p> : <p className={style.acao} onClick={() => mudarEditar(!editar)}><FontAwesomeIcon icon={faPencil}></FontAwesomeIcon> Editar serviço</p> : null}
                </div>
            </div>
        </div>
    );
}

export default CardServico;