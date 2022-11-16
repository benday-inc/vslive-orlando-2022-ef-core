using System.Collections.Generic;

namespace Benday.Demo7.WebUi.Models
{
    public partial class SecurityLoginModel
    {
        public SecurityLoginModel()
        {
            LoginTypes = new List<SecurityLoginOption>();
        }

        public List<SecurityLoginOption> LoginTypes { get; set; }
    }
}
