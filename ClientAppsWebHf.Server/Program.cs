using ClientAppsWebHf.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace ClientAppsWebHf.Server
{
    public class Program
    {
        private static void CreateDbIfNotExists(IHost host) 
        {
            var services = host.Services;
            try
            {
                var scope = services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
                DbInit.Init(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred creating the DB.");
            }
        }

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<DatabaseContext>(option =>
               option.UseSqlServer(builder.Configuration
               .GetConnectionString("DefaultConnection")));

            builder.Services.AddCors();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200", "https://127.0.0.1:4200", "https://localhost:4200"));

            app.UseHttpsRedirection();
            //app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("/index.html");


            CreateDbIfNotExists(app);

            app.Run();
        }
    }
}
