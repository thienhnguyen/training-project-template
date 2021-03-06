﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace backend.Migrations
{
    public partial class AddUserIdLogTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Loggings",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Loggings");
        }
    }
}
