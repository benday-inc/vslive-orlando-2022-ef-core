using Benday.Demo7.Api;

namespace Benday.Demo7.UnitTests.Fakes.Security
{
    public class FakeUsernameProvider : IUsernameProvider
    {
        public string GetUsernameReturnValue { get; set; }

        public string Username => GetUsernameReturnValue;
    }
}
