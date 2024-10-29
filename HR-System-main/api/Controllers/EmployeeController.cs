using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

using api.Interfaces;

namespace api.Controllers
{


[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDBContext _context;
    private readonly ISenderEmail _emailSender;

    public EmployeeController(UserManager<AppUser> userManager, ApplicationDBContext context, ISenderEmail emailSender)
    {
        _userManager = userManager;
        _context = context;
        _emailSender = emailSender;
    }


     [HttpPost]
public async Task<IActionResult> CreateEmployee([FromBody] EmployeeDto employeeDto)
{
    // Step 1: Create a new AppUser record
    var user = new AppUser
    {
        UserName = employeeDto.Email,
        Email = employeeDto.Email,
        EmailConfirmed = false
    };

    // Create user and set password
    var result = await _userManager.CreateAsync(user, employeeDto.PasswordHash);
    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }

    // Step 2: Assign Role if RoleId is provided
    if (!string.IsNullOrEmpty(employeeDto.RoleId))
    {
        var role = await _context.Roles.FindAsync(employeeDto.RoleId);
        if (role != null)
        {
            await _userManager.AddToRoleAsync(user, role.Name);
        }
    }

    // Step 3: Generate an email confirmation token
    var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
    var confirmationLink = Url.Action(nameof(ConfirmEmail), "Employee", new { token, email = user.Email }, Request.Scheme);

    // Step 4: Send confirmation email
    var emailBody = $"Please confirm your account by clicking this link: {confirmationLink}<br/>";
    await _emailSender.SendEmailAsync(user.Email, "Confirm your email and set your password", emailBody);

    // Step 5: Create an employee record and link to the created AppUser
    var employee = new Employee
    {
        Name = employeeDto.Name,
        Surname = employeeDto.Surname,
        Email = employeeDto.Email,
        IdentityNumber = employeeDto.IdentityNumber,
        PassportNumber = employeeDto.PassportNumber,
        DateOfBirth = employeeDto.DateOfBirth,
        Gender = employeeDto.Gender,
        TaxNumber = employeeDto.TaxNumber,
        MaritalStatus = employeeDto.MaritalStatus,
        PhysicalAddress = employeeDto.PhysicalAddress,
        PostalAddress = employeeDto.PostalAddress,
        Salary = employeeDto.Salary,
        ContractType = employeeDto.ContractType,
        StartDate = employeeDto.StartDate,
        EndDate = employeeDto.EndDate,
        Url = employeeDto.Url,
        PasswordHash = employeeDto.PasswordHash,
        AppUserId = user.Id,
        RoleId = employeeDto.RoleId // Set RoleId here if provided
    };

    // Add the employee to the context
    _context.Employees.Add(employee);
    await _context.SaveChangesAsync();

    return Ok(new { Message = "User and employee created successfully." });
}


[HttpGet]
public async Task<IActionResult> GetEmployees()
{
    var employees = await _context.Employees.ToListAsync();
    
    if (employees == null || !employees.Any())
    {
        return NotFound("No employees found.");
    }

    var employeeDtos = employees.Select(e => new EmployeeDto
    {   EmployeeId = e.EmployeeId,
        Name = e.Name,
        Surname = e.Surname,
        Email = e.Email,
        IdentityNumber = e.IdentityNumber,
        PassportNumber = e.PassportNumber,
        DateOfBirth = e.DateOfBirth,
        Gender = e.Gender,
        TaxNumber = e.TaxNumber,
        MaritalStatus = e.MaritalStatus,
        PhysicalAddress = e.PhysicalAddress,
        PostalAddress = e.PostalAddress,
        Salary = e.Salary,
        ContractType = e.ContractType,
        StartDate = e.StartDate,
        EndDate = e.EndDate,
        Url = e.Url
    }).ToList();

    return Ok(employeeDtos);
}

[HttpGet("{id}")]
public async Task<IActionResult> GetEmployeeById(int id)
{
    // Fetch employee by the exact ID passed in the request
    var employee = await _context.Employees
        .Where(e => e.EmployeeId == id)
        .Select(e => new EmployeeDto
        {
            Name = e.Name,
            Surname = e.Surname,
            Email = e.Email,
            IdentityNumber = e.IdentityNumber,
            PassportNumber = e.PassportNumber,
            DateOfBirth = e.DateOfBirth,
            Gender = e.Gender,
            TaxNumber = e.TaxNumber,
            MaritalStatus = e.MaritalStatus,
            PhysicalAddress = e.PhysicalAddress,
            PostalAddress = e.PostalAddress,
            Salary = e.Salary,
            ContractType = e.ContractType,
            StartDate = e.StartDate,
            EndDate = e.EndDate,
            Url = e.Url
        })
        .FirstOrDefaultAsync();

    if (employee == null)
    {
        return NotFound($"Employee with ID {id} not found.");
    }

    return Ok(employee);
}

    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest("Invalid Email.");
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            return Ok("Email confirmed successfully.");
        }

        return BadRequest("Email confirmation failed.");
    }

    
}


}