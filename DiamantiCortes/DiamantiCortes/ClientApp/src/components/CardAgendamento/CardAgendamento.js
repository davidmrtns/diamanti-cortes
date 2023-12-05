import { faPhone, faCalendarDays, faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from "./CardAgendamento.module.css";
import { useEffect, useState } from 'react';

function CardAgendamento({ agendamento }) {
    const [servicosAgendados, setServicosAgendados] = useState([]);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var resposta;

                await fetch('api/buscar-servicos-agendados?id=' + agendamento.id, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });

                setServicosAgendados(resposta);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        buscarDados();
    }, []);

    const excluir = async () => {
        try {
            var resposta;
            await fetch('api/cancelar-agendamento?id=' + agendamento.id, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => response.json()).then((data) => { resposta = data });
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        if (resposta) {
            alert("Agendamento cancelado com sucesso");
        }
    }

    return (
        <div className={style.card} id={agendamento.id}>
            <div className={style.gaveta}>
                <div>
                    <h1>{agendamento.nomeCliente}</h1>
                    <ul>
                        {servicosAgendados ? servicosAgendados.map((object) => (
                            <li>{object.nomeServico}</li>
                        )) : <p>Carregando...</p>}
                    </ul>
                </div>
                
                <div>
                    <p><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> {agendamento.telefoneCliente}</p>
                    <p><FontAwesomeIcon icon={faCalendarDays}></FontAwesomeIcon> {agendamento.data}</p>
                    <p className={style.acao} onClick={excluir}><FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Cancelar agendamento</p>
                </div>
            </div>
        </div>
    );
}

export default CardAgendamento;