namespace DiamantiCortes.Classes
{
    public class Agendamento
    {
        //atributos
        private string id, nomeCLiente, telefoneCliente, idCabeleireiro, idServico, idHoraDia;

        //propriedades (get/set)
        public string Id { get { return id; } set { id = value; } }
        public string NomeCliente { get { return nomeCLiente; } set { nomeCLiente = value; } }
        public string TelefoneCliente { get { return telefoneCliente; } set { telefoneCliente = value; } }
        public string IdCabeleireiro { get { return idCabeleireiro; } set { idCabeleireiro = value; } }
        public string IdServico { get { return idServico; } set { idServico = value; } }
        public string IdHoraDia { get { return idHoraDia; } set { idHoraDia = value; } }

        //construtor
        public Agendamento(string nomeCliente, string telefoneCliente, string idCabeleireiro, string idServico, string idHoraDia)
        {
            NomeCliente = nomeCliente;
            TelefoneCliente = telefoneCliente;
            IdCabeleireiro = idCabeleireiro;
            IdServico = idServico;
            IdHoraDia = idHoraDia;
        }

        public bool InserirAgendamento()
        {
            //conectar com o banco de dados
            try
            {
                //abrir a conexão
                //criar a query SQL com propriedades da classe)
                //executar a query
                //retornar verdadeiro
                return true;
            }
            catch
            {
                //retornar falso em caso de erro
                return false;
            }
        }
    }
}
