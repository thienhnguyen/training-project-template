using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Middleware;
using backend.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace backend
{
    public class Startup
    {
        private readonly string TenantName = "thntest.onmicrosoft.com";
        private readonly string ClientId = "f7bb073d-437d-4a5a-a8b9-7e354f842e42";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddRazorRuntimeCompilation();

            services.AddDbContext<AppDbContext>(o => o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                   CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme =
                   CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme =
                   OpenIdConnectDefaults.AuthenticationScheme;
            }).AddOpenIdConnect(options =>
            {
                options.Authority = "https://login.microsoftonline.com/" +
                                        this.TenantName;
                options.ClientId = this.ClientId;
                options.ResponseType = OpenIdConnectResponseType.IdToken;
                options.CallbackPath = "/projects";
                //options.SignedOutRedirectUri = "https://localhost:44311/";
            }).AddCookie();

            services.AddMvc();

            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = 2048;
                x.MultipartBodyLengthLimit = 209715200;
                x.MultipartHeadersLengthLimit = 209715200;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<LoggingMiddleware>();

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Project}/{action=Index}/{id?}");
            });
        }
    }
}
