using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class UpdateLogTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RequestId",
                table: "Loggings");

            migrationBuilder.AddColumn<string>(
                name: "CorrelationId",
                table: "Loggings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CorrelationId",
                table: "Loggings");

            migrationBuilder.AddColumn<string>(
                name: "RequestId",
                table: "Loggings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
