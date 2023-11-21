import { useState } from "react";

import styles from "../agendamento.module.css"

const Form = () => {

    const [barba, setBarba] = useState()
    const [cabelo, setCabelo] = useState()
    const [sombrancelha, setSombrancelha] = useState()
    const [horas, setHoras] = useState()
    const [dias, setDias] = useState()
    const [telefone, setTelefone] = useState()
    const [nome, setNome] = useState()

    const  env = (e)=>{
        e.preventDefault()
        var servico = document.getElementsByName[0];
        console.log(cabelo)
        console.log(barba)
        console.log(sombrancelha)
        console.log(nome)
        console.log(telefone)
        console.log(dias)
        console.log(horas)
    }
    
    return(
        <div className={styles.form}>
            <h1 style={{color:" rgb(161, 34, 34)"}}>AGENDAMENTO</h1>
            <form onSubmit={env}>

                <div>
                    <div><h5>CORTE</h5>
                        <input className={styles.check} type="radio" name="servicos" onChange={(e) => setCabelo(e.target.value)} />
                    </div>
                    <div><h5>BARBA</h5>
                        <input className={styles.check} type="radio" name="servicos" onChange={(e) => setBarba(e.target.value)} />
                    </div>
                    <div><h5>SOMBRANCELHA</h5>
                        <input className={styles.check} type="radio" name="servicos" onChange={(e) => setSombrancelha(e.target.value)} />
                    </div>
                    
                </div>

                <div>
                    <label htmlFor="nome"></label><br/>   
                    <input  className={styles.input} id="nome" type="text" placeholder="NOME" onChange={(e) => setNome(e.target.value)}/><br/>
                    <label htmlFor="telefone"></label><br/>   
                    <input className={styles.input} id="telefone" type="text" placeholder="NUMERO PARA CONTATO"  onChange={(e) => setTelefone(e.target.value)}/><br/><br></br>
                </div>
                <div>
                    <label htmlFor="dia">dia</label><br/>
                    <select id="dia" className={styles.select} onChange={(e) => setDias(e.target.value)}>
                        <option>terça</option>
                        <option>quarta</option>
                        <option>quinta</option>
                        <option>sexta</option>
                        <option>sabado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="horario">horario</label><br/>
                    <select id="horario" className={styles.select} onChange={(e) => setHoras(e.target.value)}>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                    </select>   
                </div>
                <input className={styles.botao} type="submit"/>
            </form>
        </div>
    )
}

export default Form;




