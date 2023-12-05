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
            long? resultado;
            //obtém dados do model (recebidos pelo fetch do frontend)
            string nomeCliente = agendamento.NomeCliente;
            string telefoneCliente = agendamento.TelefoneCliente;
            string idCabeleireiro = agendamento.IdCabeleireiro;
            string idServico = "1";
            string data = agendamento.Data;

            try
            {
                //cria o objeto do agendamento e faz a inserção no banco de dados
                Agendamento a = new Agendamento(nomeCliente, telefoneCliente, idCabeleireiro, idServico, data);
                resultado = a.InserirAgendamento();
            }
            catch
            {
                resultado = null;
            }
            //retorna o resultado
            return Ok(resultado);
        }

        [Route("inserir-cabeleireiro")]
        [HttpPost]
        public IActionResult InserirCabeleireiro([FromBody] CabeleireiroModel cabeleireiro)
        {
            bool resultado;

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

            return Ok(resultado);
        }

        [Route("inserir-servico")]
        [HttpPost]
        public IActionResult InserirServico([FromBody] ServicoModel servico)
        {
            bool resultado;

            string id = servico.Id;
            string nomeServico = servico.NomeServico;
            string descricao = servico.Descricao;
            float preco = servico.Preco;

            try
            {
                Servico s = new Servico(id, nomeServico, descricao, preco);
                resultado = s.InserirServico();
            }
            catch
            {
                resultado = false;
            }

            return Ok(resultado);
        }

        [Route("inserir-servicos-agendamento")]
        [HttpPost]
        public IActionResult InserirServico([FromBody] ServicoAgendadoModel servicoAgendado)
        {
            bool resultado = false;

            string idAgendamento = servicoAgendado.IdAgendamento;
            List<string> idServicos = servicoAgendado.IdServicos;

            try
            {
                foreach (string idServico in idServicos)
                {
                    resultado = Servico.InserirServicoAgendado(idAgendamento, idServico);
                }
            }
            catch
            {
                resultado = false;
            }

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

        /*ATUALIZAR*/
        [Route("editar-servico")]
        [HttpPost]
        public IActionResult AtualizarServico([FromBody] ServicoModel servico)
        {
            bool resultado;

            string id = servico.Id;
            string nomeServico = servico.NomeServico;
            string descricao = servico.Descricao;
            float preco = servico.Preco;

            try
            {
                Servico s = new Servico(id, nomeServico, descricao, preco);
                resultado = s.EditarServico();
            }
            catch
            {
                resultado = false;
            }

            return Ok(resultado);
        }

        /*BUSCAR*/
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

        [HttpGet]
        [Route("listar-servicos")]
        public IActionResult ListarServicos()
        {
            List<Servico> lista = Servico.ListarServicos();

            if (lista != null)
            {
                return Ok(lista);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("listar-dias-semana")]
        public IActionResult ListarDiasSemana()
        {
            List<DiaSemana> lista = DiaSemana.ListarDiasSemana();

            if (lista != null)
            {
                return Ok(lista);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("listar-atendimentos-mes")]
        public IActionResult ListarAgendamentosMes([FromQuery] int mes, [FromQuery] int ano)
        {
            List<Agendamento> lista = Agendamento.BuscarAgendamentosMes(mes, ano);

            if (lista != null)
            {
                return Ok(lista);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("buscar-servicos-agendados")]
        public IActionResult BuscarServicosAgendados([FromQuery] string id)
        {
            List<Servico> lista = Servico.BuscarServicosAgendados(id);

            if (lista != null)
            {
                return Ok(lista);
            }
            else
            {
                return NoContent();
            }
        }

        /*EXCLUIR*/
        [HttpDelete]
        [Route("cancelar-agendamento")]
        public IActionResult CancelarAgendamento([FromQuery] int id)
        {
            return Ok(Agendamento.ExcluirAgendamento(id));
        }

        [HttpDelete]
        [Route("excluir-servico")]
        public IActionResult ExcluirServico([FromQuery] int id)
        {
            return Ok(Servico.ExcluirServico(id));
        }

        /*DESCONECTAR*/
        [HttpGet]
        [Route("desconectar")]
        public bool Desconectar()
        {
            try
            {
                HttpContext.Session.Clear();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
