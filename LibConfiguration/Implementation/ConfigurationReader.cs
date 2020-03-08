using AppConfig.Lib.Interface;
using AppConfig.Lib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AppConfig.Lib.Implementation
{
    public class ConfigurationReader : IConfigurationReader
    {
        private readonly string _appName;
        private readonly ConfigurationRepository _repo;
        private Dictionary<string, object> _configurations = new Dictionary<string, object>();
        private readonly CancellationTokenSource _cancelToken;

        public ConfigurationReader(string applicationName, string connectionString, int refreshTimerIntervalInMs)
        {
            _appName = applicationName;
            _repo = new ConfigurationRepository(new Helper.ConfigDBContext(connectionString));
            RefreshDictionary();
            Task.Run(() => BackgroundWorker(refreshTimerIntervalInMs));
        }
        ~ConfigurationReader()
        {
            _cancelToken.Cancel();
        }

        private Task BackgroundWorker(int time)
        {
            do
            {
                Thread.Sleep(time);
                RefreshDictionary();
            } while (_cancelToken == null || !_cancelToken.IsCancellationRequested);
            return null;
        }

        private void RefreshDictionary()
        {
            var result = _repo.GetAll().Where(x => x.IsActive == true && x.ApplicationName == _appName).ToList();
            _configurations.Clear();
            foreach (var item in result)
            {
                if (!_configurations.ContainsKey(item.Name))
                {
                    _configurations.Add(item.Name, item);
                }
            }
        }

        public T GetValue<T>(string key)
        {
            Configuration config = _configurations.ContainsKey(key) ? _configurations[key] as Configuration : null;
            if (config == null)
                throw new Exception();
            if (typeof(T) != GetType(config.Type))
            {
                throw new Exception("Tip hatası");
            }

            return (T)Convert.ChangeType(config.Value, typeof(T));
        }
        private Type GetType(string t)
        {
            switch (t)
            {
                case "Integer":
                    return typeof(int);
                case "Boolean":
                    return typeof(bool);
                case "String":
                    return typeof(string);
                case "Datetime":
                    return typeof(DateTime);
                case "Long":
                    return typeof(long);
                case "Decimal":
                    return typeof(decimal);
                default:
                    return typeof(string);
            }
        }
    }
}
