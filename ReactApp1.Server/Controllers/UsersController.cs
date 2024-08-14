using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ReactApp1.Data;
using ReactApp1.Server.Models;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> Registration(UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Kiểm tra tính duy nhất của Username và Email
            var existingUser = await dbContext.Users
                .FirstOrDefaultAsync(x => x.Email == userDTO.Email || x.UserName == userDTO.UserName);
            
            if (existingUser != null)
            {
                return BadRequest("User already exists with the same email or username.");
            }

            var newUser = new User
            {
                UserName = userDTO.UserName,
                Email = userDTO.Email,
                PasswordHash = userDTO.PasswordHash
            };

            dbContext.Users.Add(newUser);
            await dbContext.SaveChangesAsync();

            return Ok("User registered successfully");
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
                    new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email)
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"], 
                    claims, 
                    expires: DateTime.UtcNow.AddMinutes(60),
                    signingCredentials: signIn
                );

                var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(new { token = tokenValue });
            }

            return BadRequest("Invalid username or password.");
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await dbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
                return Ok(user);
            else
                return NoContent();
        }

        [HttpGet]
        [Route("CurrentUser")]
        [Authorize]
        public IActionResult GetCurrentUser()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "Id")?.Value;

            if (int.TryParse(userIdClaim, out int userId))
            {
                var user = dbContext.Users.FirstOrDefault(u => u.Id == userId);
                if (user != null)
                    return Ok(user);
            }

            return Unauthorized();
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class SecureController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult GetSecureData()
        {
            return Ok("This is a secure data.");
        }
    }
}
