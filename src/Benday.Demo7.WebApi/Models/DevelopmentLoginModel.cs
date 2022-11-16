namespace Benday.Demo7.WebApi.Models
{
    public class DevelopmentLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }

        public bool KeepMeLoggedIn { get; set; }

        public string RedirectUrl { get; set; }
    }
}
