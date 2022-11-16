namespace Benday.Demo7.WebApi.Models
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
