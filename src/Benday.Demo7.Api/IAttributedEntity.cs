using System.Collections.Generic;
using Benday.Demo7.Api.DataAccess.Entities;

namespace Benday.Demo7.Api
{
    public interface IAttributedEntity
    {
        List<EntityBase> GetAttributes();
    }
}
