using Microsoft.AspNetCore.Authentication;

namespace Benday.Demo7.IntegrationTests.SecurityFakes
{
    public class FakeSecurityAuthenticationSchemeOptions : AuthenticationSchemeOptions
    {
        public bool IsAuthorized { get; set; }
        public string Username { get; set; }
    }
}
