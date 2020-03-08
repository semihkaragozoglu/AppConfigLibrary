using System;
using System.Collections.Generic;
using System.Text;

namespace AppConfig.Lib.Models
{
    public class Configuration
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public bool IsActive { get; set; }
        public string ApplicationName { get; set; }

        internal T GetValue<T>()
        {
            throw new NotImplementedException();
        }
    }
}
