using System;
using Microsoft.AspNetCore.Authorization;

namespace Benday.Demo7.Api.Security
{
    public class RoleAuthorizationRequirement : IAuthorizationRequirement
    {
        public RoleAuthorizationRequirement(string roleName)
        {
            RoleName = roleName ?? throw new ArgumentNullException(nameof(roleName), "Argument cannot be null.");
        }
        public string RoleName { get; set; }
    }
}
