using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SignalR_ProductManagement.Models;

namespace SignalR_ProductManagement.Data
{
    public class ApplicationDbContext(IConfiguration _configuration) : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
    }
}
