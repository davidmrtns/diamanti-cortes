using MySql.Data.MySqlClient;

namespace DiamantiCortes.Classes
{
    public class Agendamento
    {
        //atributos
        private string id, nomeCliente, telefoneCliente, idCabeleireiro, idServico, data;

        //propriedades (get/set)
        public string Id { get { return id; } set { id = value; } }
        public string NomeCliente { get { return nomeCliente; } set { nomeCliente = value; } }
        public string TelefoneCliente { get { return telefoneCliente; } set { telefoneCliente = value; } }
        public string IdCabeleireiro { get { return idCabeleireiro; } set { idCabeleireiro = value; } }
        public string IdServico { get { return idServico; } set { idServico = value; } }
        public string Data { get { return data; } set { data = value; } }

        //construtor
        public Agendamento(string id, string nomeCliente, string telefoneCliente, string idCabeleireiro, string idServico, string data)
        {
            Id = id;
            NomeCliente = nomeCliente;
            TelefoneCliente = telefoneCliente;
            IdCabeleireiro = idCabeleireiro;
            IdServico = idServico;
            Data = data;
        }

        public Agendamento(string nomeCliente, string telefoneCliente, string idCabeleireiro, string idServico, string data)
        {
            NomeCliente = nomeCliente;
            TelefoneCliente = telefoneCliente;
            IdCabeleireiro = idCabeleireiro;
            IdServico = idServico;
            Data = data;
        }

        public long? InserirAgendamento()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO agendamento VALUES(@idAgendamento, @nomeCliente, " +
                    "@telefone, @FK_SERVICO_idServico, @FK_CABELEIREIRO_idCabeleireiro, @data)", con);

                query.Parameters.AddWithValue("@idAgendamento", Id);
                query.Parameters.AddWithValue("@nomeCliente", NomeCliente);
                query.Parameters.AddWithValue("@telefone", TelefoneCliente);
                query.Parameters.AddWithValue("@FK_SERVICO_idServico", IdServico);
                query.Parameters.AddWithValue("@FK_CABELEIREIRO_idCabeleireiro", IdCabeleireiro);
                query.Parameters.AddWithValue("@data", Data);

                query.ExecuteNonQuery();
                con.Close();

                return query.LastInsertedId; ;
            }
            catch
            {
                return null;
            }
        }

        public static List<Agendamento> BuscarAgendamentosMes(int mes, int ano)
        {
            List<Agendamento> lista = new List<Agendamento>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM agendamento WHERE MONTH(data) = @mes AND YEAR(data) = @ano", con);
                query.Parameters.AddWithValue("@mes", mes);
                query.Parameters.AddWithValue("@ano", ano);

                MySqlDataReader leitor = query.ExecuteReader();

                while (leitor.Read())
                {
                    if (leitor.HasRows)
                    {
                        Agendamento agendamento = new Agendamento(
                            leitor["idAgendamento"].ToString(),
                            leitor["nomeCliente"].ToString(),
                            leitor["telefone"].ToString(),
                            leitor["FK_SERVICO_idServico"].ToString(),
                            leitor["FK_CABELEIREIRO_idCabeleireiro"].ToString(),
                            leitor["data"].ToString()
                            );

                        lista.Add(agendamento);
                    }
                }

                con.Close();
            }
            catch
            {
                lista = null;
            }

            return lista;
        }

        public static bool ExcluirAgendamento(int id)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("DELETE FROM agendamento WHERE idAgendamento = @id", con);
                query.Parameters.AddWithValue("@id", id);

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
