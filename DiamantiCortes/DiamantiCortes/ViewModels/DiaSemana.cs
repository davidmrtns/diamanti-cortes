using DiamantiCortes.Classes;
using MySql.Data.MySqlClient;

namespace DiamantiCortes.ViewModels
{
    public class DiaSemana
    {
        private string id, horaInicial, horaFinal;
        private Int16 dia;

        public string Id { get { return id; } set { id = value; } }
        public string HoraInicial { get { return horaInicial; } set { horaInicial = value; } }
        public string HoraFinal { get { return horaFinal; } set { horaFinal = value; } }
        public Int16 Dia { get { return dia; } set { dia = value; } }

        public DiaSemana(string id, Int16 dia, string horaInicial, string horaFinal)
        {
            Id = id;
            Dia = dia;
            HoraInicial = horaInicial;
            HoraFinal = horaFinal;
        }

        public static List<DiaSemana> ListarDiasSemana()
        {
            List<DiaSemana> lista = new List<DiaSemana>();
            MySqlConnection con = new MySqlConnection(Conexao.CodConexao);

            try
            {
                con.Open();

                MySqlCommand query = new MySqlCommand("SELECT * FROM dias_semana", con);
                MySqlDataReader leitor = query.ExecuteReader();

                while (leitor.Read())
                {
                    DiaSemana diaSemana = new DiaSemana(leitor["idDia"].ToString(), (Int16)leitor["diaSemana"], 
                        leitor["horaInicial"].ToString(), leitor["horaFinal"].ToString());
                    lista.Add(diaSemana);
                }

                con.Close();
            }
            catch(Exception e)
            {
                string mensagem = e.Message;
                lista = null;
            }

            return lista;
        }
    }
}
