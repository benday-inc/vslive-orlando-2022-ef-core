using Benday.Demo7.Api.DataAccess.Entities;
using Benday.EfCore.SqlServer;

namespace Benday.Demo7.Api.DataAccess.SqlServer
{
    public partial interface IUserClaimRepository :
        ISearchableRepository<UserClaimEntity>
    {
}
}