using MySql.Data.MySqlClient;
using System.Security.Cryptography;
using System.Text;

namespace DiamantiCortes.Classes
{
    public class Cabeleireiro
    {
        private string id, nome, usuario, senha;

        public string Id { get { return id; } set {  id = value; } }
        public string Nome { get { return nome; } set { nome = value; } }
        public string Usuario { get { return usuario; } set { usuario = value; } }
        public string Senha { get { return senha; } set { senha = value; } }

        public Cabeleireiro(string id, string nome, string usuario, string senha)
        {
            Id = id;
            Nome = nome;
            Usuario = usuario;
            Senha = senha;
        }

        public bool InserirCabeleireiro()
        {
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            var sha = SHA256.Create();
            var asByteArray = Encoding.Default.GetBytes(Senha);
            var hashedPassword = sha.ComputeHash(asByteArray);
            string senhaHash = Convert.ToBase64String(hashedPassword);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("INSERT INTO cabeleireiro VALUES(@idCabeleireiro, @nomeCabeleireiro, " +
                    "@usuario, @senha)", con);

                query.Parameters.AddWithValue("@idCabeleireiro", Id);
                query.Parameters.AddWithValue("@nomeCabeleireiro", Nome);
                query.Parameters.AddWithValue("@usuario", Usuario);
                query.Parameters.AddWithValue("@senha", senhaHash);

                query.ExecuteNonQuery();
                con.Close();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public static Cabeleireiro Autenticar(string usuario, string senha)
        {
            Cabeleireiro c = null;
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            var sha = SHA256.Create();
            var asByteArray = Encoding.UTF8.GetBytes(senha);
            var hashedPassword = sha.ComputeHash(asByteArray);
            string senhaInformada = Convert.ToBase64String(hashedPassword);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM cabeleireiro WHERE usuario = @usuario AND senha = @senha", con);
                query.Parameters.AddWithValue("@usuario", usuario);
                query.Parameters.AddWithValue("@senha", senhaInformada);

                MySqlDataReader leitor = query.ExecuteReader();

                if (leitor.HasRows)
                {
                    while (leitor.Read())
                    {
                        string id = leitor["idCabeleireiro"].ToString();
                        string nomeCabeleireiro = leitor["nomeCabeleireiro"].ToString();
                        string usuarioBanco = leitor["usuario"].ToString();
                        string senhaBanco = leitor["senha"].ToString();

                        c = new Cabeleireiro(id, nomeCabeleireiro, usuarioBanco, senhaBanco);
                    }
                }
                con.Close();
            }
            catch
            {
                c = null;
            }
            return c;
        }
    }
}
