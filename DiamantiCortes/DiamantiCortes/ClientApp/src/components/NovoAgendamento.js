function NovoAgendamento() {

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

    return (
        <div>
            <h1>Página de Novo Agendamento</h1>
            <p>Página onde o cliente fará o agendamento</p>
        </div>
    );
}

export default NovoAgendamento;