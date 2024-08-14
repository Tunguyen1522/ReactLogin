using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class Register
    {
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public string Username { get; set; }

    }
}
