using System;
using System.Collections.Generic;
using System.Text;

namespace AppConfig.Lib.Interface
{
    public interface IConfigurationReader
    {
        T GetValue<T>(string key);
    } 
}
