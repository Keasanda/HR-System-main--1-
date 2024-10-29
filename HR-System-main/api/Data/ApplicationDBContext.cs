using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<BankingDetail> BankingDetails { get; set; }
        public DbSet<JobGrade> JobGrades { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<LeavePolicy> LeavePolicies { get; set; }
        public DbSet<Qualification> Qualifications { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<ForgotPasswordModel> ForgotPasswordModels { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<ResetPasswordModel> ResetPasswordModels { get; set; }
        public DbSet<UserPasswordHistory> UserPasswordHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

           builder.Entity<Employee>()
            .Property(e => e.RoleId)
            .IsRequired(false); // Make RoleId nullable  


    // Define the relationship between Employee and AppUser
    builder.Entity<AppUser>()
        .Property(u => u.Id)
        .HasColumnName("AppUserId");

    builder.Entity<Employee>()
        .HasKey(e => e.EmployeeId); // Ensure EmployeeId is the primary key

    builder.Entity<Employee>()
        .Property(e => e.EmployeeId)
        .ValueGeneratedOnAdd(); // Set to auto-generate

    builder.Entity<Employee>()
        .HasOne(i => i.AppUser)
        .WithMany(u => u.Employees)
        .HasForeignKey(i => i.AppUserId);

    // Seed roles
    List<IdentityRole> roles = new List<IdentityRole>
    {
        new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" },
        new IdentityRole { Name = "Employee", NormalizedName = "Employee" },
        new IdentityRole { Name = "Executive", NormalizedName = "Executive" }
    };
    
    builder.Entity<IdentityRole>().HasData(roles);
}
    }
}