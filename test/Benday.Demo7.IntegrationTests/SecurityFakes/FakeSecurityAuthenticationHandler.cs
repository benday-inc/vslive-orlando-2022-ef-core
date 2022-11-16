using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Benday.Demo7.Api.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Benday.Demo7.IntegrationTests.SecurityFakes
{
    public class FakeSecurityAuthenticationHandler : AuthenticationHandler<FakeSecurityAuthenticationSchemeOptions>
    {
        public FakeSecurityAuthenticationHandler(
            IOptionsMonitor<FakeSecurityAuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock) : base(options, logger, encoder, clock)
        {
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            if (Options.IsAuthorized == true)
            {
                Console.WriteLine($"{nameof(FakeSecurityAuthenticationHandler.HandleAuthenticateAsync)}: is authorized = true");

                var userPrincipal = GetPrincipal(Options.IsAuthorized);

                return AuthenticateResult.Success(
                    new AuthenticationTicket(
                    userPrincipal, Scheme.Name)
                    );
            }
            else
            {
                Console.WriteLine($"{nameof(FakeSecurityAuthenticationHandler.HandleAuthenticateAsync)}: is authorized = false");

                return AuthenticateResult.Fail($"Not authorized using {nameof(FakeSecurityAuthenticationHandler)}.");
            }
        }

        private ClaimsPrincipal GetPrincipal(bool isAuthorized)
        {
            var value = Options.Username;

            if (value == null)
            {
                Console.WriteLine($"WARNING: Options.Username is null.");
            }

            var claims = new List<Claim>();

            if (value != null)
            {
                claims.Add(new Claim(SecurityConstants.Claim_X_MsClientPrincipalName, value));
                claims.Add(new Claim(ClaimsIdentity.DefaultNameClaimType, value));

                if (isAuthorized == true)
                {
                    claims.Add(new Claim(ClaimTypes.Role, SecurityConstants.RoleName_Admin));
                }
            }

            var identity = new ClaimsIdentity(claims, Scheme.Name);

            var principal = new ClaimsPrincipal(identity);

            return principal;
        }
    }
}
