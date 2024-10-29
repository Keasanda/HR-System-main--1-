using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class LeavePolicy
    {
        public int LeavePolicyId { get; set; }
        public int LeaveDays { get; set; }
        public int? JobGradeId { get; set; }
        public JobGrade? JobGrade { get; set; }
    }
}