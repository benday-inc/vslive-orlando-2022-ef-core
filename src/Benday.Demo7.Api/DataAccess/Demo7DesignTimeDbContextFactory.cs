using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Benday.Demo7.Api.DataAccess
{
    public class Demo7DesignTimeDbContextFactory :
        IDesignTimeDbContextFactory<Demo7DbContext>
    {
        public static Demo7DbContext Create()
        {
            var environmentName =
                Environment.GetEnvironmentVariable(
                "ASPNETCORE_ENVIRONMENT");

            var basePath = AppContext.BaseDirectory;

            return Create(basePath, environmentName);
        }

        public Demo7DbContext CreateDbContext(string[] args)
        {
            return Create(
                Directory.GetCurrentDirectory(),
                Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
        }

        private static Demo7DbContext Create(string basePath, string environmentName)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(basePath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{environmentName}.json", true)
                .AddJsonFile($"appsettings.unversioned.json", true)
                .AddEnvironmentVariables();

            var config = builder.Build();

            var connstr = config.GetConnectionString("default");

            if (string.IsNullOrWhiteSpace(connstr) == true)
            {
                throw new InvalidOperationException(
                    "Could not find a connection string named 'default'.");
            }
            else
            {
                return Create(connstr);
            }
        }

        private static Demo7DbContext Create(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
                throw new ArgumentException(
                $"{nameof(connectionString)} is null or empty.",
                nameof(connectionString));

            var optionsBuilder =
                new DbContextOptionsBuilder<Demo7DbContext>();

            optionsBuilder.UseSqlServer<Demo7DbContext>(options =>
            {
                options.EnableRetryOnFailure();
                optionsBuilder.UseSqlServer(connectionString);
            });

            return new Demo7DbContext(optionsBuilder.Options);
        }
    }
}
