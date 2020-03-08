using AppConfig.Lib.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace AppConfig.Lib.Interface
{
   
    public interface IConfigurationRepository : IDisposable
    {
        List<Configuration> GetAll(); 
    }
}
