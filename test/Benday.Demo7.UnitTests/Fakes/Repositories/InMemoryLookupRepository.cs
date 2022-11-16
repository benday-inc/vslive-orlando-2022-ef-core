using System.Collections.Generic;
using System.Linq;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.Demo7.Api.DataAccess.SqlServer;

namespace Benday.Demo7.UnitTests.Fakes.Repositories
{
    public class InMemoryLookupRepository : InMemoryRepository<LookupEntity>, ILookupRepository
    {
        public IList<LookupEntity> GetAllByType(string lookupType)
        {
            return (from temp in Items
                    where temp.LookupType == lookupType
                    select temp).ToList();
        }
    }
}
