﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    public class ProjectController : Controller
    {
        private readonly AppDbContext _context;
        private string currentUserName;

        public ProjectController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            currentUserName = User.Identity.Name;
            TempData["username"] = currentUserName;
            return View(await _context.Projects.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> Create(IFormFile files)
        {
            if (files != null)
            {
                if (files.Length > 0)
                {
                    var fileName = Path.GetFileName(files.FileName);
                    var fileExtension = Path.GetExtension(fileName);

                    var objfiles = new Project()
                    {
                        FileName = files.FileName,
                        FileType = files.ContentType,
                        CreatedAt = DateTime.Now,
                        CreatedBy = User.Identity.Name,
                        ModifiedAt = DateTime.Now,
                        ModifiedBy = User.Identity.Name
                };

                    using (var target = new MemoryStream())
                    {
                        files.CopyTo(target);
                        objfiles.DataFiles = target.ToArray();
                    }

                    _context.Projects.Add(objfiles);
                    _context.SaveChanges();

                }
            }
            return RedirectToAction("Index", await _context.Projects.ToListAsync());
        }

        [Route("projects/download/{id}")]
        [HttpGet]
        public FileResult Download(int? id)
        {
            var project = _context.Projects.ToList().Find(p => p.Id == id);
            var cd = new System.Net.Mime.ContentDisposition
            {
                FileName = project.FileName,
                Inline = false,
            };
            Response.Headers.Add("Content-Disposition", cd.ToString());
            return File(project.DataFiles, project.FileType, project.FileName);
        }

        [Route("projects/{id}")]
        [HttpPut]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var project = await _context.Projects
                .FirstOrDefaultAsync(m => m.Id == id);
            project = new Project
            {
                Id = project.Id,
                FileName = project.FileName
            };
            _context.Projects.Update(project);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [Route("projects/{id}")]
        [HttpPost]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var project = await _context.Projects
                .FirstOrDefaultAsync(m => m.Id == id);
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        private bool ProjectExists(int id)
        {
            return _context.Projects.Any(e => e.Id == id);
        }
    }
}
