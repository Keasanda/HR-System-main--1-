using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class JobGrade
    {
        public int JobGradeId { get; set; }
        public string Grade { get; set; } = string.Empty;
        public int? JobTitleId { get; set; }
        public JobTitle? JobTitle { get; set; }
        public List<LeavePolicy> leavePolicies { get; set; } = new List<LeavePolicy>();
    }
}