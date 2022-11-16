using System.Collections.Generic;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.EfCore.SqlServer;

namespace Benday.Demo7.Api.DataAccess.SqlServer
{
    public interface ILookupRepository : ISearchableRepository<LookupEntity>
    {
        IList<LookupEntity> GetAllByType(string lookupType);
    }
}
