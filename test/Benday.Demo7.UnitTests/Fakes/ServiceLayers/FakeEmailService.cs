using System.Threading.Tasks;
using Benday.Demo7.Api.ServiceLayers;

namespace Benday.Demo7.UnitTests.Fakes.ServiceLayers
{
    public class FakeEmailService : IEmailService
    {
        public Task SendEmail(string recipientEmail, string recipientName, string subject)
        {
            return Task.CompletedTask;
        }
    }
}
