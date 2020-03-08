using System;
using System.Threading;
using AppConfig.Lib.Implementation;
namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            //TODO: Sql connection bilgisi appsettingsten çekilecek
            ConfigurationReader _configurationReader = new ConfigurationReader("Console1", "Server=.\\SQLExpress;Database=ConfigDB;Trusted_Connection=True;", 15000);
            //TODO: dolması için süre bekleniyor. 
            for (int i = 0; i < 2000; i++)
            { 
                var siteName = _configurationReader.GetValue<string>("SiteName");
                var maxItemCount = _configurationReader.GetValue<int>("MaxItemCount");
                var isBasketEnabled = _configurationReader.GetValue<bool>("IsBasketEnabled"); 
                Console.WriteLine($"siteName: {siteName} - maxItemCount: {maxItemCount} - isBasketEnabled: {isBasketEnabled}");
                Thread.Sleep(1000);
            }
        }
    }
}
