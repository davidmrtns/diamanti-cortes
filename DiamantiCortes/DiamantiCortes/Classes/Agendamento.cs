using MySql.Data.MySqlClient;

namespace DiamantiCortes.Classes
{
    public class Agendamento
    {
        //atributos
        //private bool cabelo, barba, sobrancelha;
        private string id, nomeCLiente, telefoneCliente, idCabeleireiro, idServico, idHoraDia;

        //propriedades (get/set)
        public string Id { get { return id; } set { id = value; } }
        /*public bool Cabelo { get { return cabelo; } set { cabelo = value; } }
        public bool Barba { get { return barba; } set { barba = value; } }
        public bool Sobrancelha { get { return sobrancelha; } set { sobrancelha = value; } }*/
        public string NomeCliente { get { return nomeCLiente; } set { nomeCLiente = value; } }
        public string TelefoneCliente { get { return telefoneCliente; } set { telefoneCliente = value; } }
        public string IdCabeleireiro { get { return idCabeleireiro; } set { idCabeleireiro = value; } }
        public string IdServico { get { return idServico; } set { idServico = value; } }
        public string IdHoraDia { get { return idHoraDia; } set { idHoraDia = value; } }

        //construtor
        public Agendamento(string nomeCliente, /*bool cabelo, bool barba, bool sobrancelha,*/ string telefoneCliente, string idCabeleireiro, string idServico, string idHoraDia)
        {
            NomeCliente = nomeCliente;
            /*Cabelo = cabelo;
            Barba = barba;
            Sobrancelha = sobrancelha;*/
            TelefoneCliente = telefoneCliente;
            IdCabeleireiro = idCabeleireiro;
            IdServico = idServico;
            IdHoraDia = idHoraDia;
        }

        public bool InserirAgendamento()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO agendamento VALUES(@idAgendamento, @nomeCliente, " +
                    "@telefone, @FK_SERVICO_idServico, @FK_CABELEIREIRO_idCabeleireiro, @FK_HORARIOS_DIA_idHoraDia)", con);

                query.Parameters.AddWithValue("@idAgendamento", Id);
                query.Parameters.AddWithValue("@nomeCliente", NomeCliente);
                query.Parameters.AddWithValue("@telefone", TelefoneCliente);
                query.Parameters.AddWithValue("@FK_SERVICO_idServico", IdServico);
                query.Parameters.AddWithValue("@FK_CABELEIREIRO_idCabeleireiro", IdCabeleireiro);
                query.Parameters.AddWithValue("FK_HORARIOS_DIA_idHoraDia", IdHoraDia);

                query.ExecuteNonQuery();
                con.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
