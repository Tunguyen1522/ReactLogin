﻿using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class UserDTO
    {
        [Required]
        public string UserName { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
    }
}
