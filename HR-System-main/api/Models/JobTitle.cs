using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class JobTitle
    {
        public int JobTitleId { get; set; }
        public string Title { get; set; } = string.Empty;
        public int? EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public List<JobGrade> JobGrades { get; set; } = new List<JobGrade>();
    }
}