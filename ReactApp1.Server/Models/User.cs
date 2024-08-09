using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class User 
    {
        public int Id { get; set; } = 0;
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int IsActive { get; set; } = 1;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}
