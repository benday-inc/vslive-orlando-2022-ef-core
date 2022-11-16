using System.Collections.Generic;
using System.Security.Claims;

namespace Benday.Demo7.Api.Security
{
    public interface IClaimsAccessor
    {
        IEnumerable<Claim> Claims { get; }
    }
}
