using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class Roles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "39f3e6f0-6fdb-42c6-8d53-3dc4d530ced6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1f164a5-4f09-4fce-80cc-5be68f8540f2");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "39f3e6f0-6fdb-42c6-8d53-3dc4d530ced6", null, "Admin", "ADMIN" },
                    { "a1f164a5-4f09-4fce-80cc-5be68f8540f2", null, "User", "USER" }
                });
        }
    }
}
