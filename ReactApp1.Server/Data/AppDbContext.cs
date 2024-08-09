using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using ReactApp1.Server.Models;

namespace ReactApp1.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

    }
}
