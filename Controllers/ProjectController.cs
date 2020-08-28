using System;
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
        public async Task<IActionResult> Index(int? pageNumber)
        {
            //throw new Exception("test");

            currentUserName = User.Identity.Name;
            int pageSize = 5;
            return View(await PaginatedList<Project>.CreateAsync(_context.Projects.AsNoTracking(), pageNumber ?? 1, pageSize));
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Create([FromForm] IFormFile files)
        {
            //throw new Exception("test");
            if (files != null)
            {
                if (files.Length > 0)
                {
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
            return RedirectToAction("Index", await _context.Projects.AsNoTracking().ToListAsync());
        }

        [Route("projects/download/{id}")]
        [HttpGet]
        public FileResult Download(int id)
        {
            var project = _context.Projects.ToList().Find(p => p.Id == id);
            return File(project.DataFiles, project.FileType, project.FileName);
        }

        [Route("projects")]
        [HttpPut]
        public async Task<IActionResult> Edit(Project obj)
        {
            if (obj == null)
            {
                return NotFound();
            }

            var project = await _context.Projects
                .FirstOrDefaultAsync(m => m.Id == obj.Id);
            project = new Project
            {
                Id = project.Id,
                FileName = project.FileName,
                CreatedAt = project.CreatedAt,
                CreatedBy = project.CreatedBy,
                ModifiedAt = DateTime.Now,
                ModifiedBy = User.Identity.Name,
                DataFiles = project.DataFiles,
                FileType = project.FileType
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
