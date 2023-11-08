import {useState} from 'react'
import { BiLogoInstagram  } from "react-icons/bi";
import { BiLogoWhatsapp  } from "react-icons/bi";


import styles from './agendamento.module.css'
import Form from './TelaAgendamento/Form';
function NovoAgendamento() {
/*
    async function inserir() {
        var resposta;
        //puxar dados do formulário com js (tratar com .trim())
        var nomeCliente = "";
        var telefoneCliente = "";
        var idCabeleireiro = "";
        var idServico = "";
        var idHoraDia = "";

        //verificar se os dados são vazios ou inválidos
        if (nomeCliente == "" || telefoneCliente == "" || idCabeleireiro == "" || idServico == "" || idHoraDia == "") {
            alert('Preencha os campos corretamente!');
        } else {
            try {
                await fetch('api/inserir-agendamento', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nomeCliente: nomeCliente,
                        telefoneCliente: telefoneCliente,
                        idCabeleireiro: idCabeleireiro,
                        idServico: idServico,
                        idHoraDia: idHoraDia
                    })
                }).then((response) => response.json()).then((data) => { resposta = data });
            } catch {
                resposta = null;
            }
        }
        return resposta;
    }
*/

    return (
        <div className={styles.pai}>
            <div className={styles.cabecalho}>
                    <span><h1>DIAMANTE CORTES</h1></span>
                    <span><BiLogoInstagram className={styles.insta}/></span>
                    <span><BiLogoWhatsapp size={30} className={styles.whats}/><p className={styles.telefone}>(19)98733-0936</p></span>
            </div>
            <div>
                <Form/>
            </div>  
        </div>    
    );
}

export default NovoAgendamento;