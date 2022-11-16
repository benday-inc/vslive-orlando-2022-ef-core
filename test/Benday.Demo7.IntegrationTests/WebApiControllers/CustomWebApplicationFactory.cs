using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Benday.Demo7.IntegrationTests.WebApiControllers
{
    public class CustomWebApplicationFactory<TEntryPoint> :
        WebApplicationFactory<TEntryPoint> where TEntryPoint : class
    {
        protected override IWebHostBuilder CreateWebHostBuilder()
        {
            return WebHost.CreateDefaultBuilder(null)
                .UseSetting("https_port", "5001")
                .UseStartup<TEntryPoint>();
        }
    }
}
