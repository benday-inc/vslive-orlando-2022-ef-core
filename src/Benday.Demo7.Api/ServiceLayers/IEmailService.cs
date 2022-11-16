using System.Threading.Tasks;

namespace Benday.Demo7.Api.ServiceLayers
{
    public interface IEmailService
    {
        Task SendEmail(string recipientEmail, string recipientName, string subject);
    }
}
