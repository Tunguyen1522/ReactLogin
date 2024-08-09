using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ReactApp1.Data;
using System.Text;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Configuration;
using ReactApp1.Server.Models;

using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private readonly IConfiguration configuration;
        public UsersController(AppDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("Registration")]
        public IActionResult Registration(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objUser = dbContext.Users.FirstOrDefault(x => x.Email == userDTO.Email);
            if (objUser == null)
            {
                dbContext.Users.Add(new User
                {
                    UserName = userDTO.UserName,
                    Email = userDTO.Email,
                    PasswordHash = userDTO.PasswordHash
                });
                dbContext.SaveChanges();
                return Ok("User registered successfully");
            }
            else
            {
                return BadRequest("User already exists with the same email address.");
            }
        }
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.UserName == loginDTO.Username && x.PasswordHash == loginDTO.PasswordHash);
            if (user != null)
            {
                var claims = new[]
                {
                    new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: signIn
                    );
                string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(user);
            }
            return NoContent();

        }

        [HttpGet]
        [Route("GetUsers")]

        public IActionResult GetUsers()
        {
            return Ok(dbContext.Users.ToList());
        }

        [HttpGet]
        [Route("GetUser")]
        public IActionResult GetUser(int id)
        {
            var user = dbContext.Users.FirstOrDefault(x => x.Id == id);
            if (User != null)
                return Ok(user);
            else
                return NoContent();
        }

    }
}
