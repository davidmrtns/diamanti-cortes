import styles from "../agendamento.module.css"

const Form = () => {

    const env = (e)=>{
        e.preventDefault();

        var cabelo = document.getElementById("cabelo").checked;
        var barba = document.getElementById("barba").checked;
        var sobrancelha = document.getElementById("sobrancelha").checked;
        var nome = document.getElementById("nome").value;
        var telefone = document.getElementById("telefone").value;
        var dia = document.getElementById("dia").value;
        var horario = document.getElementById("horario").value;

        if (cabelo || barba || sobrancelha || nome || telefone || dia || horario) {
            alert(cabelo);
            alert(barba);
            alert(sobrancelha);
            alert(nome);
            alert(telefone);
            alert(dia);
            alert(horario);
        }
    }
    
    return(
        <div className={styles.form}>
            <h1 style={{ color: " rgb(161, 34, 34)" }}>AGENDAMENTO</h1>
            <form method="post" onSubmit={env}>

                <div>
                    <div><h5>CORTE</h5>
                        <input className={styles.check} id="cabelo" type="checkbox" />
                    </div>
                    <div><h5>BARBA</h5>
                        <input className={styles.check} id="barba" type="checkbox" />
                    </div>
                    <div><h5>SOBRANCELHA</h5>
                        <input className={styles.check} id="sobrancelha" type="checkbox" />
                    </div>
                    
                </div>

                <div>
                    <label htmlFor="nome"></label><br/>   
                    <input  className={styles.input} id="nome" type="text" placeholder="NOME" /><br/>
                    <label htmlFor="telefone"></label><br/>   
                    <input className={styles.input} id="telefone" type="text" placeholder="NUMERO PARA CONTATO" /><br/><br></br>
                </div>
                <div>
                    <label htmlFor="dia">dia</label><br/>
                    <select id="dia" className={styles.select}>
                        <option>terça</option>
                        <option>quarta</option>
                        <option>quinta</option>
                        <option>sexta</option>
                        <option>sabado</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="horario">horario</label><br/>
                    <select id="horario" className={styles.select}>
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




