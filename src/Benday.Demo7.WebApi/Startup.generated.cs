using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Benday.Demo7.WebApi.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Benday.Demo7.Api.DataAccess;
using Benday.Demo7.Api;
using Benday.Demo7.Api.ServiceLayers;
using Benday.Demo7.Api.DomainModels;
using Benday.EfCore.SqlServer;
using Benday.Common;
using Benday.Demo7.Api.Logging;
using Benday.Demo7.Api.DataAccess.SqlServer;
using Benday.Demo7.Api.AzureStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Benday.Demo7.WebApi.Security;
using Benday.Demo7.Api.Security;

namespace Benday.Demo7.WebApi
{
    public partial class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            services.AddControllersWithViews();
            services.AddDatabaseDeveloperPageExceptionFilter();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo7 API", Version = "v1" });
            });
            
            ConfigureSecurity(services);
            
            QueueTypeRegistrations(services);
            RegisterTypesForDbContexts(services);
            RegisterTypesForAzureStorageBlobs(services);
            RegisterQueuedTypes(services);
        }
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            ConfigureLogging(app, loggerFactory);
            
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Demo7 API v1");
            });
            
            ConfigureHttps(app);
            
            app.UseStaticFiles();
            
            app.UseRouting();
            
            ConfigureSecurity(app);
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapFallbackToFile("index.html");
            });
        }
        
        protected virtual void ConfigureHttps(IApplicationBuilder app)
        {
            app.UseHttpsRedirection();
        }
        
        partial void BeforeQueueTypeRegistrations(IServiceCollection services);
        partial void AfterQueueTypeRegistrations(IServiceCollection services);
        
        protected virtual void QueueTypeRegistrations(IServiceCollection services)
        {
            BeforeQueueTypeRegistrations(services);
            
            QueueTypeRegistration<IHttpContextAccessor, HttpContextAccessor>(ServiceLifetime.Singleton);
            QueueTypeRegistration<IUsernameProvider, HttpContextUsernameProvider>();
            QueueTypeRegistration<IUserInformation, UserInformation>();
            QueueTypeRegistration<IUsernameProvider, UserInformation>();
            QueueTypeRegistration<ISearchStringParserStrategy, DefaultSearchStringParserStrategy>();
            QueueTypeRegistrationsForPopulateClaimsMiddleware();
            QueueTypeRegistrationsForServiceLayers();
            QueueTypeRegistrationsForValidators();
            QueueTypeRegistrationsForRepositories();
            
            AfterQueueTypeRegistrations(services);
        }
        
        protected virtual void RegisterTypesForAzureStorageBlobs(IServiceCollection services)
        {
            // azure images
            services.Configure<AzureBlobImageStorageOptions>(options =>
            {
                options.UseDevelopmentStorage = Configuration.GetValue<bool>("AzureStorage:UseDevelopmentStorage");
                options.AccountKey = Configuration.GetValue<string>("AzureStorage:AccountKey");
                options.AccountName = Configuration.GetValue<string>("AzureStorage:AccountName");
                options.ContainerName = Configuration.GetValue<string>("AzureStorage:ContainerName");
                options.ReadTokenExpirationInSeconds = Configuration.GetValue<int>("AzureStorage:ReadTokenExpirationInSeconds");
            });
            
            QueueTypeRegistration<IAzureBlobImageSasTokenGenerator, AzureBlobImageStorageHelper>();
            QueueTypeRegistration<AzureBlobImageStorageOptions>();
        }
        
        protected virtual void RegisterTypesForDbContexts(IServiceCollection services)
        {
            services.AddDbContext<Demo7DbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("default"),
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery)));
            
            QueueTypeRegistration<IDemo7DbContext, Demo7DbContext>();
        }
        
        protected List<ITypeRegistrationItem> _QueuedTypeRegistrations = new List<ITypeRegistrationItem>();
        
        protected virtual void QueueTypeRegistration<TService>(
            ServiceLifetime instancingMode = ServiceLifetime.Transient)
            where TService : class
        {
            _QueuedTypeRegistrations.Add(new TypeRegistrationItem<TService, TService>(instancingMode));
        }
        
        protected virtual void QueueTypeRegistration<TService, TImplementation>(
            ServiceLifetime instancingMode = ServiceLifetime.Transient)
            where TService : class
            where TImplementation : class, TService
        {
            _QueuedTypeRegistrations.Add(new TypeRegistrationItem<TService, TImplementation>(instancingMode));
        }
        
        partial void BeforeRegisterQueuedTypes(IServiceCollection services);
        partial void AfterRegisterQueuedTypes(IServiceCollection services);
        
        protected virtual void RegisterQueuedTypes(IServiceCollection services)
        {
            BeforeRegisterQueuedTypes(services);
            
            foreach (var item in _QueuedTypeRegistrations)
            {
                if (item.Lifetime == ServiceLifetime.Transient)
                {
                    services.AddTransient(item.ServiceType, item.ImplementationType);
                }
                else if (item.Lifetime == ServiceLifetime.Scoped)
                {
                    services.AddScoped(item.ServiceType, item.ImplementationType);
                }
                else if (item.Lifetime == ServiceLifetime.Singleton)
                {
                    services.AddSingleton(item.ServiceType, item.ImplementationType);
                }
                else
                {
                    throw new InvalidOperationException($"Unsupported instancing mode '{item.Lifetime}'.");
                }
            }
            
            AfterRegisterQueuedTypes(services);
        }
        
        private void QueueTypeRegistrationsForRepositories()
        {
            var lifetime = ServiceLifetime.Scoped;
            
            QueueTypeRegistration<IConfigurationItemRepository, SqlEntityFrameworkConfigurationItemRepository>(lifetime);
            QueueTypeRegistration<IFeedbackRepository, SqlEntityFrameworkFeedbackRepository>(lifetime);
            QueueTypeRegistration<ILogEntryRepository, SqlEntityFrameworkLogEntryRepository>(lifetime);
            QueueTypeRegistration<ILookupRepository, SqlEntityFrameworkLookupRepository>(lifetime);
            QueueTypeRegistration<IPersonRepository, SqlEntityFrameworkPersonRepository>(lifetime);
            QueueTypeRegistration<IUserRepository, SqlEntityFrameworkUserRepository>(lifetime);
            QueueTypeRegistration<IUserClaimRepository, SqlEntityFrameworkUserClaimRepository>(lifetime);
        }
        
        private void QueueTypeRegistrationsForValidators()
        {
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.ConfigurationItem>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.ConfigurationItem>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.Feedback>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.Feedback>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.LogEntry>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.LogEntry>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.Lookup>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.Lookup>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.Person>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.Person>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.User>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.User>>();
            QueueTypeRegistration<IValidatorStrategy<Benday.Demo7.Api.DomainModels.UserClaim>, DefaultValidatorStrategy<Benday.Demo7.Api.DomainModels.UserClaim>>();
        }
        
        private void QueueTypeRegistrationsForServiceLayers()
        {
            QueueTypeRegistration<IConfigurationItemService, ConfigurationItemService>();
            QueueTypeRegistration<IFeedbackService, FeedbackService>();
            QueueTypeRegistration<ILogEntryService, LogEntryService>();
            QueueTypeRegistration<ILookupService, LookupService>();
            QueueTypeRegistration<IPersonService, PersonService>();
            QueueTypeRegistration<IUserService, UserService>();
            QueueTypeRegistration<IUserClaimService, UserClaimService>();
        }
        
        protected virtual void ConfigureSecurity(IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UsePopulateClaimsMiddleware();
            app.UseAuthorization();
        }
        
        protected virtual void ConfigureLogging(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            BeforeConfigureLogging(app, loggerFactory);
            
            var config = app.ApplicationServices.GetRequiredService<IConfiguration>();
            
            var connectionString = config.GetConnectionString("default");
            
            loggerFactory.AddProvider(
                new SqlDatabaseLoggerProvider(
                new SqlDatabaseLoggerOptions()
            {
                LogLevel = LogLevel.Information,
                    ConnectionString = connectionString
            }
            ));
            
            AfterConfigureLogging(app, loggerFactory);
        }
        
        partial void BeforeConfigureLogging(IApplicationBuilder app, ILoggerFactory loggerFactory);
        partial void AfterConfigureLogging(IApplicationBuilder app, ILoggerFactory loggerFactory);
        
        protected virtual void ConfigureSecurity(IServiceCollection services)
        {
            ConfigureAuthentication(services);
            ConfigureAuthorization(services);
        }
        
        protected virtual void ConfigureAuthentication(IServiceCollection services)
        {
            var config = new SecurityConfiguration(Configuration);
            
            services.AddAuthentication(
                CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
            {
                options.Events.OnRedirectToLogin = (ctx) =>
                {
                    if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                    {
                        ctx.Response.StatusCode = 401;
                    }
                    
                    return Task.CompletedTask;
                };
                
                options.Events.OnRedirectToAccessDenied = (ctx) =>
                {
                    if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                    {
                        ctx.Response.StatusCode = 403;
                    }
                    
                    return Task.CompletedTask;
                };
                options.LoginPath = new PathString(config.LoginPath);
                options.LogoutPath = new PathString(config.LogoutPath);
                options.AccessDeniedPath = new PathString(config.LoginPath);
            });
        }
        
        protected virtual void ConfigureAuthorization(IServiceCollection services)
        {
            services.AddSingleton<IAuthorizationHandler, LoggedInUsingEasyAuthHandler>();
            services.AddSingleton<IAuthorizationHandler, RoleAuthorizationHandler>();
            services.AddSingleton<IAuthorizationHandler, ClaimAuthorizationHandler>();
            services.AddTransient<IRouteDataAccessor, HttpContextRouteDataAccessor>();
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy(SecurityConstants.Policy_LoggedInUsingEasyAuth,
                    policy => policy.Requirements.Add(
                    new LoggedInUsingEasyAuthRequirement()));
                
                options.AddPolicy(SecurityConstants.Policy_IsAdministrator,
                    policy => policy.Requirements.Add(
                    new RoleAuthorizationRequirement(
                    SecurityConstants.RoleName_Admin)));
                
                options.DefaultPolicy = options.GetPolicy(SecurityConstants.Policy_LoggedInUsingEasyAuth);
            });
        }
        protected virtual void QueueTypeRegistrationsForPopulateClaimsMiddleware()
        {
            QueueTypeRegistration<PopulateClaimsMiddleware>();
            QueueTypeRegistration<ISecurityConfiguration, SecurityConfiguration>();
            QueueTypeRegistration<IClaimsAccessor, HttpContextClaimsAccessor>();
        }
    }
}