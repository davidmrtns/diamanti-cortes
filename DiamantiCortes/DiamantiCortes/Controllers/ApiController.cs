using DiamantiCortes.Classes;
using DiamantiCortes.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DiamantiCortes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        /*INSERIR*/
        [Route("inserir-agendamento")]
        [HttpPost]
        public IActionResult InserirAgendamento([FromBody] AgendamentoModel agendamento)
        {
            bool resultado;
            //obtém dados do model (recebidos pelo fetch do frontend)
            string nomeCliente = agendamento.NomeCliente;
            string telefoneCliente = agendamento.TelefoneCliente;
            string idCabeleireiro = agendamento.IdCabeleireiro;
            string idServico = "1";
            string idHoraDia = "1";
            /*string idServico = agendamento.IdServico;
            string idHoraDia = agendamento.IdHoraDia;*/

            try
            {
                //cria o objeto do agendamento e faz a inserção no banco de dados
                Agendamento a = new Agendamento(nomeCliente, telefoneCliente, idCabeleireiro, idServico, idHoraDia);
                resultado = a.InserirAgendamento();
            }
            catch
            {
                resultado = false;
            }
            //retorna o resultado
            return Ok(resultado);
        }

        [Route("inserir-cabeleireiro")]
        [HttpPost]
        public IActionResult InserirCabeleireiro([FromBody] CabeleireiroModel cabeleireiro)
        {
            bool resultado;

            //obtém dados do model (recebidos pelo fetch do frontend)
            string id = cabeleireiro.Id;
            string nome = cabeleireiro.Nome;
            string usuario = cabeleireiro.Usuario;
            string senha = cabeleireiro.Senha;

            try
            {
                Cabeleireiro c = new Cabeleireiro(id, nome, usuario, senha);
                resultado = c.InserirCabeleireiro();
            }
            catch
            {
                resultado = false;
            }
            //retorna o resultado
            return Ok(resultado);
        }

        [Route("autenticar")]
        [HttpPost]
        public IActionResult Autenticar([FromBody] CabeleireiroModel cabeleireiro)
        {
            string usuario = cabeleireiro.Usuario;
            string senha = cabeleireiro.Senha;

            Cabeleireiro c = Cabeleireiro.Autenticar(usuario, senha);

            if (c != null)
            {
                HttpContext.Session.SetString("_LoggedUser", JsonSerializer.Serialize(c));
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet]
        [Route("validar")]
        public bool Validar()
        {
            Cabeleireiro c = null;

            try
            {
                c = JsonSerializer.Deserialize<Cabeleireiro>(HttpContext.Session.GetString("_LoggedUser"))!;
                return true;
            }
            catch
            {
                c = null;
                return false;
            }
        }
    }
}
