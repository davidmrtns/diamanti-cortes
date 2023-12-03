namespace DiamantiCortes.Classes
{
    public class Conexao
    {
        private static readonly string codConexao = Environment.GetEnvironmentVariable("CONNECTION_STRING_DIAMANTI", EnvironmentVariableTarget.User);
        
        public static string CodConexao { get { return codConexao; } }
    }
}
