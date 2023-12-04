import React, { useState, useEffect } from 'react';
import style from "./Atendimentos.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parse, isSameDay } from 'date-fns';
import CardAgendamento from './CardAgendamento/CardAgendamento';

function Atendimentos() {
    const [startDate, setStartDate] = useState(new Date());
    const [diasTrabalho, setDiasTrabalho] = useState([]);
    const [atendimentosMes, setAtendimentosMes] = useState([]);
    const [diasFiltrados, setDiasFiltrados] = useState([]);
    const [interacaoHabilitada, setInteracaoHabilitada] = useState(false);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                var resposta;
                await fetch('api/listar-dias-semana', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });

                var array = resposta.map(item => item.dia);
                setDiasTrabalho(array);

                setInteracaoHabilitada(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        buscarDados();
    }, []);

    const filtrarDia = (data) => {
        let diasFiltrados = [];

        if (atendimentosMes) {
            diasFiltrados = atendimentosMes.filter((object) => {
                const objectDate = parse(object.data, "dd/MM/yyyy HH:mm:ss", new Date());
                return isSameDay(objectDate, data);
            });
        }

        setDiasFiltrados(diasFiltrados);
    }

    const temExpediente = (date) => {
        return diasTrabalho.includes(date.getDay());
    };

    const mudancaDia = (date) => {
        var mesAnt = startDate.getMonth() + 1;
        var anoAnt = startDate.getFullYear();
        setStartDate(date);
        listarAgendamentos(mesAnt, anoAnt, date);
    }

    registerLocale('pt-BR', ptBR);
    setDefaultLocale('pt-BR');

    const listarAgendamentos = async (mesAnt, anoAnt, dataNova) => {
        var mes = dataNova.getMonth() + 1;
        var ano = dataNova.getFullYear();

        if (atendimentosMes.length >= 1 && (mesAnt === mes && anoAnt === ano)) {

        } else {
            try {
                var resposta;
                await fetch('api/listar-atendimentos-mes?mes=' + mes.toString() + '&ano=' + ano.toString(), {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { resposta = data });

                setAtendimentosMes(resposta);
            } catch {
                alert("Um erro ocorreu");
            }
        }
    }

    useEffect(() => {
        filtrarDia(startDate);
    }, [atendimentosMes, startDate]);

    return (
        <div>
            <header>
                <h1>Barbearia Diamanti - Atendimentos do dia</h1> 
            </header>
            <section id="cliente-do-dia">
                <div className={style.gaveta}>
                    <DatePicker
                        className={style.input}
                        id="datePicker"
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        locale="pt-BR"
                        showMonthDropdown
                        showYearDropdown
                        todayButton="Hoje"
                        minDate={new Date()}
                        onChange={(date) => mudancaDia(date)}
                        filterDate={temExpediente}
                        disabled={!interacaoHabilitada}
                        showIcon
                        placeholderText="Data do agendamento"
                        icon={<FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>} />
                    <h2>Clientes agendados para hoje</h2>
                    <div className={style.agendamentos}>
                        {diasFiltrados && diasFiltrados.length > 0 ? diasFiltrados.map((item) => (
                            <CardAgendamento agendamento={item} />
                        )) : <p>Nenhum atendimento para hoje</p>}
                    </div>
                </div>
            </section>
            <footer>
                <p>&copy; 2023 Barbearia Diamanti</p>
            </footer>
        </div>
    );
}

export default Atendimentos;
