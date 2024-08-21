using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Cat> Cats { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserName)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Cat>()
                .HasIndex(c => c.Price);


            modelBuilder.Entity<Cat>()
               .HasIndex(c => c.Breed);

            modelBuilder.Entity<Cat>()
               .HasIndex(c => c.Age);

            modelBuilder.Entity<Cat>()
               .HasIndex(c => c.Description);

            modelBuilder.Entity<Cat>()
               .HasIndex(c => c.ImageUrl);

            modelBuilder.Entity<Cat>()
               .HasIndex(c => c.Name);


            modelBuilder.Entity<CartItem>()
               .HasOne(ci => ci.Cat)
               .WithMany() 
               .HasForeignKey(ci => ci.CatId);

            
            modelBuilder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId);

          
            modelBuilder.Entity<OrderItem>()
                .HasOne(oi => oi.Cat)
                .WithMany() 
                .HasForeignKey(oi => oi.CatId);


            base.OnModelCreating(modelBuilder);
        }
    }
}
