using Microsoft.AspNetCore.Mvc;

namespace DiamantiCortes.Controllers
{
    public class ApiController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
