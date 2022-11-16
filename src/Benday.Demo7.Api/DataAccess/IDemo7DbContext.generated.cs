using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Benday.Demo7.Api.DataAccess.Entities;

namespace Benday.Demo7.Api.DataAccess
{
    public partial interface IDemo7DbContext
    {
        DbSet<ConfigurationItemEntity> ConfigurationItemEntities { get; set; }
        DbSet<FeedbackEntity> FeedbackEntities { get; set; }
        DbSet<LogEntryEntity> LogEntryEntities { get; set; }
        DbSet<LookupEntity> LookupEntities { get; set; }
        DbSet<PersonEntity> PersonEntities { get; set; }
        DbSet<UserEntity> UserEntities { get; set; }
        DbSet<UserClaimEntity> UserClaimEntities { get; set; }
        
    }
}