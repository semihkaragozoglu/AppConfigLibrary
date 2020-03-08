using AppConfig.Lib.Helper;
using AppConfig.Lib.Interface;
using AppConfig.Lib.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AppConfig.Lib.Implementation
{ 
    public class ConfigurationRepository : IConfigurationRepository, IDisposable
    {
        private ConfigDBContext context;

        public ConfigurationRepository(ConfigDBContext context)
        {
            this.context = context;
        } 

        public virtual List<Configuration> GetAll()
        {
            return context.Set<Configuration>().AsNoTracking().ToList();
        }  

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
