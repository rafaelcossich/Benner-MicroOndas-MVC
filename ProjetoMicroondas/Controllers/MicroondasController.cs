using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoMicroondas.Models;
using System;
using System.Threading.Tasks;

namespace ProjetoMicroondas.Controllers
{
    public class MicroondasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Utilizar(HomeModel model)
        {

            var minuto = model.Tempo.Hours;
            var segundo = model.Tempo.Minutes;

            var time = new TimeSpan(0, minuto, segundo);

            var millisecDouble = time.TotalMilliseconds;
            int millisec = ((int)millisecDouble);
            string mensagem = "";
            int pausa = 1000;
            int millisecPassed = 0;
            do
            {
                mensagem += "... ";
                await Response.WriteAsync(mensagem);
                await Response.Body.FlushAsync();

                await Task.Delay(pausa);

                millisecPassed += pausa;
            }
            while (millisec > millisecPassed);
            mensagem += "[Aquecimento concluído]";

            return new EmptyResult();
        }

        public async Task Cronometro(int millisec, HomeModel model)
        {


        }
    }
}
