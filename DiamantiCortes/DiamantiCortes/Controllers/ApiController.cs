using DiamantiCortes.Classes;
using DiamantiCortes.ViewModels;
using Microsoft.AspNetCore.Mvc;

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
            string idServico = agendamento.IdServico;
            string idHoraDia = agendamento.IdHoraDia;

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
    }
}
