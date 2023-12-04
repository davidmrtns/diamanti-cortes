using MySql.Data.MySqlClient;

namespace DiamantiCortes.Classes
{
    public class Servico
    {
        private string id, nomeServico, descricao;
        private float preco;

        public string Id { get { return id; } set {  id = value; } }
        public string NomeServico { get {  return nomeServico; } set {  nomeServico = value; } }
        public string Descricao { get { return descricao; } set {  descricao = value; } }
        public float Preco { get {  return preco; } set {  preco = value; } }

        public Servico(string nomeServico, string descricao, float preco)
        {
            NomeServico = nomeServico;
            Descricao = descricao;
            Preco = preco;
        }

        public Servico(string id, string nomeServico, string descricao, float preco)
        {
            Id = id;
            NomeServico = nomeServico;
            Descricao = descricao;
            Preco = preco;
        }

        public bool InserirServico()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO servico VALUES(@id, @nomeServico, @preco, @descricao)", con);
                query.Parameters.AddWithValue("@id", Id);
                query.Parameters.AddWithValue("@nomeServico", NomeServico);
                query.Parameters.AddWithValue("@preco", Preco);
                query.Parameters.AddWithValue("@descricao", Descricao);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static bool InserirServicoAgendado(string idAgendamento, string idServico)
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO servico_agendado VALUES(@id, @idServico, @idAgendamento)", con);
                query.Parameters.AddWithValue("@id", "0");
                query.Parameters.AddWithValue("@idServico", idServico);
                query.Parameters.AddWithValue("@idAgendamento", idAgendamento);

                query.ExecuteNonQuery();

                con.Close();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public static List<Servico> ListarServicos()
        {
            List<Servico> lista = new List<Servico>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM servico", con);
                MySqlDataReader leitor = query.ExecuteReader();

                while (leitor.Read())
                {
                    if (leitor.HasRows)
                    {
                        Servico servico = new Servico(
                            leitor["id"].ToString(),
                            leitor["nomeServico"].ToString(),
                            leitor["descricao"].ToString(),
                            (float)leitor["preco"]
                            );

                        lista.Add(servico);
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

        public static List<Servico> BuscarServicosAgendados(string id)
        {
            List<string> listaIds = new List<string> ();
            List<Servico> lista = new List<Servico> ();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT FK_SERVICO_idServico FROM servico_agendado WHERE FK_AGENDAMENTO_idAgendamento = @id", con);
                query.Parameters.AddWithValue("@id", id);

                MySqlDataReader leitor = query.ExecuteReader();

                while (leitor.Read())
                {
                    if (leitor.HasRows)
                    {
                        listaIds.Add(leitor["FK_SERVICO_idServico"].ToString());
                    }
                }

                foreach (string idServico in listaIds)
                {
                    con.Close();
                    con.Open();

                    query = new MySqlCommand("SELECT * FROM servico WHERE id = @id", con);
                    query.Parameters.AddWithValue("@id", idServico);

                    leitor = query.ExecuteReader();

                    while (leitor.Read())
                    {
                        if (leitor.HasRows)
                        {
                            Servico servico = new Servico(
                                leitor["id"].ToString(),
                                leitor["nomeServico"].ToString(),
                                leitor["descricao"].ToString(),
                                (float)leitor["preco"]
                            );

                            lista.Add(servico);
                        }
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
    }
}
