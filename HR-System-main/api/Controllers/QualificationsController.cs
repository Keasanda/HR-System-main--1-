using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models; // Adjust the namespace as necessary
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QualificationsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;


        public QualificationsController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/qualifications
 [HttpGet]
public async Task<ActionResult<IEnumerable<QualificationDto>>> GetQualifications()
{
    // Fetch qualifications and map to DTO
    var qualifications = await _context.Qualifications
        .Select(q => new QualificationDto
        {
            QualificationType = q.QualificationType,
            YearCompleted = q.YearCompleted,
            Institution = q.Institution,
            AppUserId = q.AppUserId 
        })
        .ToListAsync();

    return Ok(qualifications);
}

        // POST: api/qualifications
        [HttpPost]
        public async Task<ActionResult<Qualification>> PostQualification(QualificationDto qualificationDto)
        {
            // Validate the incoming DTO (optional, but recommended)
            if (qualificationDto == null)
            {
                return BadRequest("Qualification data is required.");
            }

            // Create a new Qualification object from the DTO
            var qualification = new Qualification
            {
                QualificationType = qualificationDto.QualificationType,
                YearCompleted = qualificationDto.YearCompleted,
                Institution = qualificationDto.Institution,
                 AppUserId = qualificationDto.AppUserId 
            };

            // Add the qualification to the context
            _context.Qualifications.Add(qualification);
            
            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return the created qualification with a 201 status code
            return CreatedAtAction(nameof(GetQualification), new { id = qualification.QualificationId }, qualification);
        }
        // Optional: GET a single qualification by ID
[HttpGet("{id}")]
public async Task<ActionResult<QualificationDto>> GetQualification(int id)
{
    // Fetch the qualification by ID and project it to QualificationDto
    var qualification = await _context.Qualifications
        .Where(q => q.QualificationId == id) // Filter on the Qualification entity
        .Select(q => new QualificationDto
        {
            QualificationType = q.QualificationType,
            YearCompleted = q.YearCompleted,
            Institution = q.Institution,
            AppUserId = q.AppUserId // Assuming you want to return the AppUserId instead of EmployeeId
        })
        .FirstOrDefaultAsync(); // Now FirstOrDefaultAsync operates on the projected result

    if (qualification == null)
    {
        return NotFound();
    }

    return Ok(qualification);
}
    }
}