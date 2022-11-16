using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Benday.Demo7.WebUi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Benday.Demo7.WebUi.Controllers
{
    [AllowAnonymous]
    public class SecuritySummaryController : Controller
    {
        public SecuritySummaryController()
        {
        }

        public IActionResult Index()
        {
            var model = new SecuritySummaryViewModel();

            var identity = User.Identity;

            if (identity is not ClaimsIdentity claimsIdentityInstance)
            {
                model.Claims = new List<Claim>();
            }
            else
            {
                model.Claims =
                    claimsIdentityInstance.Claims.ToList();
            }

            model.Headers = Request.Headers;

            model.Cookies = Request.Cookies;

            return View(model);
        }
    }
}
