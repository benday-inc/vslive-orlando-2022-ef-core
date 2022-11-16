using System;
using Benday.Demo7.IntegrationTests.SecurityFakes;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Benday.Demo7.IntegrationTests.WebApiControllers
{
    public class CustomStartupForTesting : Benday.Demo7.WebApi.Startup
    {
        public const string ArgNameFakeSecurityIsAuthorized = "FakeSecurity.IsAuthorized";
        public const string ArgNameFakeSecurityUsername = "FakeSecurity.Username";

        public CustomStartupForTesting(IConfiguration configuration) :
            base(configuration)
        {
        }

        protected override void ConfigureHttps(IApplicationBuilder app)
        {
        }

        protected override void ConfigureAuthentication(IServiceCollection services)
        {
            Console.WriteLine($"Configuring fake security...");
            var schemeName = "FakeSecurity";

            var isAuthorizedConfigValue = Configuration.GetValue<bool?>(ArgNameFakeSecurityIsAuthorized, null);

            bool isAuthorized;

            if (isAuthorizedConfigValue == null || isAuthorizedConfigValue.HasValue == false)
            {
                Console.WriteLine($"Value for {ArgNameFakeSecurityIsAuthorized} was not specified.  Defaulting to IsAuthorized = true.");
                isAuthorized = true;
            }
            else
            {
                Console.WriteLine($"Value for {ArgNameFakeSecurityIsAuthorized} is set to {isAuthorizedConfigValue.Value}.");
                isAuthorized = isAuthorizedConfigValue.Value;
            }

            services
                .AddAuthentication(schemeName)
                .AddScheme<FakeSecurityAuthenticationSchemeOptions, FakeSecurityAuthenticationHandler>(
                schemeName,
                options =>
            {
                options.IsAuthorized = isAuthorized;
                options.Username = GetUsername(Configuration);
            });

            Console.WriteLine($"Fake security configured.");
        }

        private static string GetUsername(IConfiguration configuration)
        {
            var value = configuration.GetValue<string>(ArgNameFakeSecurityUsername, null);

            return value;
        }
    }
}
