using AppConfig.Lib.Models;
using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.Metadata;

namespace AppConfig.Lib.Helper
{
    public partial class ConfigDBContext : DbContext
    {
        private readonly string _conString;
        public ConfigDBContext(string conString)
        {
            _conString = conString;
        }

        

        public ConfigDBContext(DbContextOptions<ConfigDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Configuration> Configuration { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_conString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Configuration>(entity =>
            {
                object p = entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.ApplicationName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsFixedLength();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsFixedLength();

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsFixedLength();

                entity.Property(e => e.Value).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
