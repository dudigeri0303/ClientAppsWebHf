using Microsoft.EntityFrameworkCore;

namespace ClientAppsWebHf.Server.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<VideoGame> VideoGames { get; set; }
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<VideoGame>().ToTable("VideoGames");
        }
    }
}
