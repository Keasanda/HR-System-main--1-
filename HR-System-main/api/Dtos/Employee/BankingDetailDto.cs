using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class BankingDetailDto
    {
      
        public string BankName { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
        public int AccountNumber { get; set; }
        public int BranchCode { get; set; }
        public string AppUserId { get; set; } // Link to AppUser
    }
}