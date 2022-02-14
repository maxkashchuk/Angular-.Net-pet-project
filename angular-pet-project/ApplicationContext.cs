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
        public DbSet<User> User{ get; set; }

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
            //builder.Entity<Accounts>()
            //.Property(el => el.Id)
            //.ValueGeneratedOnAdd();
            //builder.Entity<Contacts>()
            //.Property(el => el.Id)
            //.ValueGeneratedOnAdd();
            //builder.Entity<Contacts>()
            //    .HasIndex(el => el.Email)
            //    .IsUnique();
            //builder.Entity<Accounts>()
            //    .HasKey(el => el.Id);
            //builder.Entity<Contacts>()
            //    .HasKey(el => el.Id);
            //builder.Entity<Incidents>()
            //    .HasKey(el => el.Name);
            //builder.Entity<Incidents>()
            //    .HasMany(el => el.Account);
            //builder.Entity<Accounts>()
            //    .HasMany(el => el.Contact);
        }
    }
}
