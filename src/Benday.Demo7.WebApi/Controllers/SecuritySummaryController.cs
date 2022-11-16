using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Benday.Demo7.WebApi.Controllers
{
    public class SecuritySummaryController : Controller
    {
        public IActionResult Index()
        {
            var identity = User.Identity;

            if (identity is not ClaimsIdentity claimsIdentityInstance)
            {
                return View(new List<Claim>());
            }
            else
            {
                return View(claimsIdentityInstance.Claims.ToList());
            }
        }
    }
}
