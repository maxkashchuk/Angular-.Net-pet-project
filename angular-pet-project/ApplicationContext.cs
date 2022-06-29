using angular_pet_project.Configuration;
using angular_pet_project.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project
{
    public class ApplicationContext : IdentityDbContext
    {
        public DbSet<User> User { get; set; }

        public ApplicationContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>(el => el.ToTable(name: "Users"));
            builder.Entity<IdentityRole>(el => el.ToTable(name: "Roles"));
            builder.Entity<IdentityUserRole<string>>(el => el.ToTable(name: "UsersRoles"));
            builder.Entity<IdentityUserClaim<string>>(el => el.ToTable(name: "UserClaim"));
            builder.Entity<IdentityUserLogin<string>>(el => el.ToTable(name: "UserLogins"));
            builder.Entity<IdentityUserToken<string>>(el => el.ToTable(name: "UserTokens"));
            builder.Entity<IdentityRoleClaim<string>>(el => el.ToTable(name: "RoleClaims"));

            builder.Entity<User>()
            .HasKey(el => el.Id);

            builder.Entity<User>()
            .HasIndex(el => el.Nickname)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.ActualName)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.Email)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.BirthDate)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.Image)
            .IsUnique();

            builder.Entity<User>()
            .HasIndex(el => el.BirthDate)
            .IsUnique();

            builder.ApplyConfiguration(new UserConfig());
        }
    }
}