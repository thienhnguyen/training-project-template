using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using ContentDispositionHeaderValue = System.Net.Http.Headers.ContentDispositionHeaderValue;

namespace backend.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
        {
            var correlationId = Guid.NewGuid().ToString();

            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                context.Response.Headers.Add("CorrelationId", correlationId);
                var log = new Logging
                {
                    Date = DateTime.Now,
                    CorrelationId = correlationId,
                    Message = ex.Message,
                    UserId = context.User.Identity.Name
                };
                dbContext.Loggings.Add(log);
                dbContext.SaveChanges();
            }
        }
    }
}
