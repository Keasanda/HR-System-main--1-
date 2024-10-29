using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class CreateEmployeeRequestDto
    {
               public string Name { get; set; } = string.Empty;
         public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string IdentityNumber { get; set; } = string.Empty;
        public string PassportNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public string TaxNumber { get; set; } = string.Empty;
        public string MaritalStatus { get; set; } = string.Empty;
        public string PhysicalAddress { get; set; } = string.Empty;
        public string PostalAddress { get; set; } = string.Empty;
        public int Salary { get; set; }
        public string ContractType { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; }
        public string PasswordHash { get; set; }

 public string? RoleId { get; set; } // Add nullable RoleId

    }
}