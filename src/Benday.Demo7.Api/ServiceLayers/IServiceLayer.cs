using System.Collections.Generic;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial interface IServiceLayer<T>
    {
        IList<T> GetAll(int maxNumberOfResults = 100);

        T GetById(int id);

        void Save(T saveThis);

        void DeleteById(int id);

        IList<T> Search(Search search);
    }
}
