using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class Register
    {
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string Username { get; set; }

    }
}
