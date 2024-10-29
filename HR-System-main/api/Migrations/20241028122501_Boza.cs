using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Boza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "48dc6889-3853-4c66-ad2d-9ac70280e53c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8323fc3e-8759-45fc-b6ee-80fae51e04c6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e7d4fa26-f0eb-4f37-92a6-d5da53acbd34");

            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "07b48441-5173-4bea-aa49-3983ed3b09de", null, "Executive", "Executive" },
                    { "469a66c0-dc08-425c-a507-58d1c8065cda", null, "Employee", "Employee" },
                    { "eb82e468-f678-4b11-8c8a-7edd131a3b92", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07b48441-5173-4bea-aa49-3983ed3b09de");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "469a66c0-dc08-425c-a507-58d1c8065cda");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb82e468-f678-4b11-8c8a-7edd131a3b92");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Employees");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "48dc6889-3853-4c66-ad2d-9ac70280e53c", null, "Admin", "ADMIN" },
                    { "8323fc3e-8759-45fc-b6ee-80fae51e04c6", null, "Employee", "Employee" },
                    { "e7d4fa26-f0eb-4f37-92a6-d5da53acbd34", null, "Executive", "Executive" }
                });
        }
    }
}
