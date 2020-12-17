using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SimpleWebApi.Models;

namespace SimpleWebApi.MySql
{
    public class MySqlDbContext : DbContext
    {
        private readonly IConfiguration config;

        public MySqlDbContext(IConfiguration config)
        {
            this.config = config;
            Database.EnsureCreated();
        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = $"Server={config["DB_HOST"]};Database={config["DB_DATABASE"]};port=3306;user={config["DB_USER"]};password={config["DB_PASSWORD"]}";
            optionsBuilder.UseMySQL(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnType("TEXT");
            });
        }
    }
}
