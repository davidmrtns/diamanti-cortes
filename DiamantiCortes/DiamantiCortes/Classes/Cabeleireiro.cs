namespace DiamantiCortes.Classes
{
    public class Cabeleireiro
    {
        private string id, nome, usuario, senha;

        public string Id { get { return id; } set {  id = value; } }
        public string Nome { get { return nome; } set { nome = value; } }
        public string Usuario { get { return usuario; } set { usuario = value; } }
        public string Senha { get { return senha; } set { senha = value; } }

        public Cabeleireiro(string nome, string usuario, string senha)
        {
            Nome = nome;
            Usuario = usuario;
            Senha = senha;
        }

        public bool InserirCabeleireiro()
        {
            try
            {
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
