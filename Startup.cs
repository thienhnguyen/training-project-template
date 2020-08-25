using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
        private readonly string TenantName = ""; // 'Initial Domain Name' in Azure
        private readonly string ClientId = ""; // 'Application Id' in Azure

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

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme =
            //       CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultSignInScheme =
            //       CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme =
            //       OpenIdConnectDefaults.AuthenticationScheme;
            //}).AddOpenIdConnect(options =>
            //{
            //    options.Authority = "https://login.microsoftonline.com/" +
            //                            this.TenantName;
            //    options.ClientId = this.ClientId;
            //    options.ResponseType = OpenIdConnectResponseType.IdToken;
            //    options.CallbackPath = "/security/signin-callback";
            //    options.SignedOutRedirectUri = "https://localhost:44311/";
            //}).AddCookie();

            //services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Project/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
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
