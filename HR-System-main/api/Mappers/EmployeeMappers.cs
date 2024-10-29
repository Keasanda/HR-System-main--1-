using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Employee;
using api.Models;

namespace api.Mappers
{
    public static class EmployeeMappers
    {
        public static EmployeeDto ToEmployeeDto(this Employee employeeModel)
        {
            return new EmployeeDto
            {
                EmployeeId = employeeModel.EmployeeId,
                Name = employeeModel.Name,
                Surname = employeeModel.Surname,
                Email = employeeModel.Email,
                IdentityNumber = employeeModel.IdentityNumber,
                DateOfBirth = employeeModel.DateOfBirth,
                Gender = employeeModel.Gender,
                Url = employeeModel.Url,
                TaxNumber = employeeModel.TaxNumber,
                MaritalStatus = employeeModel.MaritalStatus,
                PhysicalAddress = employeeModel.PhysicalAddress,
                PostalAddress = employeeModel.PostalAddress,
                Salary = employeeModel.Salary,
                ContractType = employeeModel.ContractType,
                StartDate = employeeModel.StartDate,
                EndDate = employeeModel.EndDate,
                PasswordHash = employeeModel.PasswordHash
                
            };
        }
        public static Employee ToEmployeeFromCreateDTO(this CreateEmployeeRequestDto employeeDto)
        {
            return new Employee
            {
                Name = employeeDto.Name,
                Surname = employeeDto.Surname,
                Email = employeeDto.Email,
                IdentityNumber = employeeDto.IdentityNumber,
                DateOfBirth = employeeDto.DateOfBirth,
                Gender = employeeDto.Gender,
                Url = employeeDto.Url,
                TaxNumber = employeeDto.TaxNumber,
                MaritalStatus = employeeDto.MaritalStatus,
                PhysicalAddress = employeeDto.PhysicalAddress,
                PostalAddress = employeeDto.PostalAddress,
                Salary = employeeDto.Salary,
                ContractType = employeeDto.ContractType,
                StartDate = employeeDto.StartDate,
                EndDate = employeeDto.EndDate,
                PasswordHash = employeeDto.PasswordHash
            };
        }
    }
}