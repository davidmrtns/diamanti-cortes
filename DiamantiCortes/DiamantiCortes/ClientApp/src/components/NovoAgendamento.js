import { BiLogoInstagram  } from "react-icons/bi";
import { BiLogoWhatsapp  } from "react-icons/bi";
import styles from './agendamento.module.css'
import Form from './TelaAgendamento/Form';

function NovoAgendamento() {
    return (
        <div className={styles.pai}>
            <div className={styles.cabecalho}>
                <span><h1>DIAMANTI CORTES</h1></span>
                <span><BiLogoInstagram className={styles.insta}/></span>
                <span><BiLogoWhatsapp size={30} className={styles.whats}/><p className={styles.telefone}>(19)98733-0936</p></span>
            </div>
            <div>
                <Form />
            </div>  
        </div>    
    );
}

export default NovoAgendamento;