using Benday.Demo7.Api;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.EfCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Linq;
using Benday.Common;
using Benday.Demo7.Api.DataAccess.SqlServer;

namespace Benday.Demo7.UnitTests.Fakes.Repositories
{
    public partial class InMemoryUserRepository :
        InMemoryRepository<UserEntity>, IUserRepository
    {
}
}