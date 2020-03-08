using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ConfigAdmin.Models;
using ConfigAdmin.Models.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ConfigAdmin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ConfigurationController : ControllerBase
    {
        private readonly ILogger<ConfigurationController> _logger;

        public ConfigurationController(ILogger<ConfigurationController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public ConfigResponseDTO Post(ConfigRequestDTO reqModel)
        {
            ConfigDBContext ctx = new ConfigDBContext();
            // TODO: Dal katmanına çek
            List<Configuration> list = ctx.Configuration
                .Skip(reqModel.PageLength * (reqModel.CurrentPageNumber - 1))
                .Take(reqModel.PageLength).ToList();

            ConfigResponseDTO model = new ConfigResponseDTO();
            model.Configurations = new List<ConfigDTO>();
            // TODO: automapper ekle
            foreach (var item in list)
            {
                model.Configurations.Add(new ConfigDTO()
                {
                    ApplicationName = item.ApplicationName,
                    Id = item.Id,
                    IsActive = item.IsActive,
                    Name = item.Name,
                    Type = item.Type,
                    Value = item.Value
                });
            }
            model.PageLength = reqModel.PageLength == 0 ? 10 : reqModel.PageLength;
            model.CurrentPageNumber = reqModel.CurrentPageNumber;
            model.TotalItemCount = model.Configurations.Count;
            return model;
        }

        [HttpPost]
        [Route("add")]
        public bool Add(ConfigDTO reqModel)
        {
            ConfigDBContext ctx = new ConfigDBContext();
            Configuration cfg = new Configuration()
            {
                ApplicationName = reqModel.ApplicationName,
                IsActive = reqModel.IsActive,
                Name = reqModel.Name,
                Type = reqModel.Type,
                Value = reqModel.Value
            };
            ctx.Configuration.Add(cfg);
            ctx.SaveChanges();
            return true;
        }

        [HttpPost]
        [Route("edit")]
        public bool Edit(ConfigDTO reqModel)
        {
            ConfigDBContext ctx = new ConfigDBContext();
            Configuration cfg = ctx.Configuration.Where(x => x.Id == reqModel.Id).FirstOrDefault();
            cfg.ApplicationName = reqModel.ApplicationName;
            cfg.IsActive = reqModel.IsActive;
            cfg.Name = reqModel.Name;
            cfg.Type = reqModel.Type;
            cfg.Value = reqModel.Value;  
            ctx.SaveChanges();
            return true;
        }

        [HttpPost]
        [Route("delete")]
        public bool Delete(ConfigDTO reqModel)
        {
            ConfigDBContext ctx = new ConfigDBContext();
            Configuration cfg = ctx.Configuration.Where(x => x.Id == reqModel.Id).FirstOrDefault();
            ctx.Configuration.Remove(cfg);
            ctx.SaveChanges();
            return true;
        }

    }
}