using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class UpdateColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "DataFiles",
                table: "Projects",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataFiles",
                table: "Projects");
        }
    }
}
