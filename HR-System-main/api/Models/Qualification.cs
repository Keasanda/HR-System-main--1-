using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Qualification
    {
        public int QualificationId { get; set; }
        public string QualificationType { get; set; } = string.Empty;
        public int YearCompleted { get; set; }
        public string Institution { get; set; } = string.Empty;
      public string AppUserId { get; set; } // Foreign key linking to AppUser

    public AppUser AppUser { get; set; } // Navigation property
    }
}