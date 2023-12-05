import React, { useState, useEffect } from 'react';
import styles from "../agendamento.module.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, setHours, setMinutes } from 'date-fns';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputMask from 'react-input-mask';
import CardServico from '../CardServico/CardServico';

const Form = () => {
    const [startDate, setStartDate] = useState(null);
    const [diasTrabalho, setDiasTrabalho] = useState([]);
    const [diasTrabalhoObj, setDiasTrabalhoObj] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [minTime, setMinTime] = useState(null);
    const [maxTime, setMaxTime] = useState(null);
    const [interacaoHabilitada, setInteracaoHabilitada] = useState(false);
    const [selectedServicos, setSelectedServicos] = useState([]);

    // Register the locale globally
    registerLocale('pt-BR', ptBR);
    // Set the default locale to 'pt-BR'
    setDefaultLocale('pt-BR');

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
                setDiasTrabalhoObj(resposta);

                setInteracaoHabilitada(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                var respostaServicos;

                await fetch('api/listar-servicos', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => response.json()).then((data) => { respostaServicos = data });

                setServicos(respostaServicos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        buscarDados();
    }, []);

    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const minimoTime = (time) => {
        const selectedDate = new Date(time);
        const diaSemana = selectedDate.getDay()
        const diaDeTrabalho = diasTrabalhoObj.find(obj => obj.dia === diaSemana);

        var resultado = diaDeTrabalho ? setHours(setMinutes(new Date(time), parseInt(diaDeTrabalho.horaInicial.split(':')[1])), parseInt(diaDeTrabalho.horaInicial.split(':')[0])) : null;
        setMinTime(resultado);
    }

    const maximoTime = (time) => {
        const selectedDate = new Date(time);
        const diaSemana = selectedDate.getDay()
        const diaDeTrabalho = diasTrabalhoObj.find(obj => obj.dia === diaSemana);

        var resultado = diaDeTrabalho ? setHours(setMinutes(new Date(time), parseInt(diaDeTrabalho.horaFinal.split(':')[1])), parseInt(diaDeTrabalho.horaFinal.split(':')[0])) : null;

        setMaxTime(resultado);
    }

    const mudancaDia = (date) => {
        maximoTime(date);
        minimoTime(date);
        setStartDate(date);
    }

    const temExpediente = (date) => {
        return diasTrabalho.includes(date.getDay());
    };

    const handleCheckboxChange = (servicoId, isChecked) => {
        if (isChecked) {
            setSelectedServicos(prevSelected => [...prevSelected, servicoId]);
        } else {
            setSelectedServicos(prevSelected => prevSelected.filter(id => id !== servicoId));
        }
    };

    const handleRetrieveSelectedServicos = () => {
        var teste = selectedServicos;
        return teste;
    };

    async function adicionar(){
        var nome = document.getElementById("nome").value.trim();
        var telefone = document.getElementById("telefone").value.replace(/[()\s-]/g, '');
        var dataAgendada = format(new Date(startDate), "yyyy-MM-dd HH:mm:ss");
        var servicos = selectedServicos;

        if (servicos.length > 0 && nome && telefone && dataAgendada) {
            var resposta;
            try {
                await fetch('api/inserir-agendamento', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeCliente: nome,
                        telefoneCliente: telefone,
                        idCabeleireiro: "0",
                        data: dataAgendada
                    })
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch {
                resposta = null;
            }

            if (resposta) {
                var respostaServicos;
                try {
                    await fetch('api/inserir-servicos-agendamento', {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            idAgendamento: resposta.toString(),
                            idServicos: servicos
                        })
                    }).then((response) => response.json()).then((data) => { respostaServicos = data });
                } catch {
                    respostaServicos = null;
                }

                if (respostaServicos) {
                    alert("Agendamento concluído com sucesso");
                } else {
                    alert("Um erro ocorreu. Tente novamente");
                }
            } else {
                alert("Um erro ocorreu. Tente novamente");
            }
        } else {
            alert("Preencha todos os campos corretamente");
        }
    }
    
    return(
        <div className={styles.form}>
            <h1 style={{ color: " rgb(161, 34, 34)" }}>AGENDAMENTO</h1>
            <div className={styles.gaveta + " " + styles.servicos}>
                {servicos ? servicos.map((item, index) => (
                    <CardServico servico={item} onCheckboxChange={handleCheckboxChange} />
                )) : <p>Nenhum atendimento para hoje</p>}
            </div>

            <div className={styles.gaveta}>
                <input className={styles.input} id="nome" type="text" placeholder="Nome" required />
                <InputMask mask="(99) 99999-9999" maskChar="_" id="telefone" type="tel" placeholder="Celular para contato" className={styles.input} />
                <DatePicker
                    className={styles.input}
                    id="datePicker"
                    dateFormat="dd/MM/yyyy HH:mm"
                    selected={startDate}
                    locale="pt-BR"
                    showTimeSelect
                    showMonthDropdown
                    showYearDropdown
                    todayButton="Hoje"
                    minDate={new Date()}
                    onChange={(date) => mudancaDia(date)}
                    timeIntervals={60}
                    filterDate={temExpediente}
                    filterTime={filterPassedTime}
                    minTime={minTime}
                    maxTime={maxTime}
                    disabled={!interacaoHabilitada}
                    showIcon
                    placeholderText="Data do agendamento"
                    icon={<FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>} />
            </div>
            <button className={styles.botao} onClick={() => adicionar()}>Enviar</button>
        </div>
    )
}

export default Form;
