using Benday.Demo7.WebApi;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;

namespace Benday.Demo7.IntegrationTests.WebApiControllers
{
    public abstract class WebApiIntegrationTestFixtureBase :
        AspNetIntegrationTestFixtureBase<CustomStartupForTesting>
    {
        private bool? _isAuthorized = null;
        private string _username = null;

        protected void SetIsAuthorized(bool value, string username = "fakeusername@fake.org")
        {
            Reset();
            _isAuthorized = value;
            _username = username;
            WebApplicationInstance = CreateWebApplicationFactory();
        }

        protected override WebApplicationFactory<CustomStartupForTesting> CreateWebApplicationFactory()
        {
            var temp = new CustomWebApplicationFactory<CustomStartupForTesting>().
                WithWebHostBuilder(builder =>
            {
                builder.UseSolutionRelativeContentRoot(
                    "src/Benday.Demo7.WebApi");

                // this is a workaround based on
                // https://github.com/dotnet/aspnetcore/issues/17655#issuecomment-581418168
                builder.ConfigureAppConfiguration((context, b) =>
                {
                    context.HostingEnvironment.ApplicationName = typeof(Startup).Assembly.GetName().Name;
                    context.Configuration[CustomStartupForTesting.ArgNameFakeSecurityIsAuthorized] = _isAuthorized.ToString();
                    context.Configuration[CustomStartupForTesting.ArgNameFakeSecurityUsername] = _username;
                });
            });

            return temp;
        }
    }
}
