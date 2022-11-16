using System.Security.Claims;

namespace Benday.Demo7.WebUi.Security
{
    public interface IUserClaimsPrincipalProvider
    {
        ClaimsPrincipal GetUser();
    }
}
