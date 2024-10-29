using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
 
public class Employee
{
    public int EmployeeId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string IdentityNumber { get; set; }
    public string PassportNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
    public string TaxNumber { get; set; }
    public string MaritalStatus { get; set; }
    public string PhysicalAddress { get; set; }
    public string PostalAddress { get; set; }
    public decimal Salary { get; set; }
    public string ContractType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string Url { get; set; }
    public string PasswordHash { get; set; }

 public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public string? RoleId {get ;set;}

        
}


}