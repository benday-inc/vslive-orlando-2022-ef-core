using Microsoft.AspNetCore.Authorization;

namespace Benday.Demo7.UnitTests.Fakes.Security
{
    public class MockAuthorizationRequirement : IAuthorizationRequirement
    {
        public MockAuthorizationRequirement(bool isAuthorizedReturnValue)
        {
            IsAuthorizedReturnValue = isAuthorizedReturnValue;
        }

        public bool IsAuthorizedReturnValue { get; set; }
    }
}
