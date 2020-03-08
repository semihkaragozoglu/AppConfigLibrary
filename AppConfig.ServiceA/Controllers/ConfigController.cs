using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppConfig.Lib.Implementation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AppConfig.ServiceA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfigController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ConfigController> _logger;

        public ConfigController(ILogger<ConfigController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get([FromServices] ConfigurationReader _configurationReader)
        {
            var siteName = _configurationReader.GetValue<string>("SiteName");
            var maxItemCount = _configurationReader.GetValue<int>("MaxItemCount");
            var isBasketEnabled = _configurationReader.GetValue<bool>("IsBasketEnabled");
            return Ok(new { siteName, maxItemCount, isBasketEnabled });
        }
    }
}
