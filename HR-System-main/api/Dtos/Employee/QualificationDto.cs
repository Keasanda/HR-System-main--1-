using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class QualificationDto
    {
         public string QualificationType { get; set; } = string.Empty;
        public int YearCompleted { get; set; }
        public string Institution { get; set; } = string.Empty;
        public string AppUserId { get; set; } 
    }
}