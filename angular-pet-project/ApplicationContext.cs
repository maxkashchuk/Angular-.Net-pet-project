using angular_pet_project.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> User { get; set; }

        public ApplicationContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
            .HasKey(el => el.Id);

            builder.Entity<User>()
            .HasIndex(el => el.Name)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.Email)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.BirthDate)
            .IsUnique();
        }
    }
}
