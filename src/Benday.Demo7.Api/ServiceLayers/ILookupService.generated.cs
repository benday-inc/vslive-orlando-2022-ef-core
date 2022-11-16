using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.DomainModels;
using Benday.EfCore.SqlServer;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial interface ILookupService : IServiceLayer<Lookup>
    {
        IList<Lookup> Search(
            SearchMethod searchTypeDisplayOrder = SearchMethod.Skip,
            int searchValueDisplayOrder = 0,
            SearchMethod searchTypeLookupType = SearchMethod.Contains,
            string searchValueLookupType = null,
            SearchMethod searchTypeLookupKey = SearchMethod.Contains,
            string searchValueLookupKey = null,
            SearchMethod searchTypeLookupValue = SearchMethod.Contains,
            string searchValueLookupValue = null,
            SearchMethod searchTypeId = SearchMethod.Skip,
            int searchValueId = 0,
            SearchMethod searchTypeStatus = SearchMethod.Contains,
            string searchValueStatus = null,
            SearchMethod searchTypeCreatedBy = SearchMethod.Contains,
            string searchValueCreatedBy = null,
            SearchMethod searchTypeLastModifiedBy = SearchMethod.Contains,
            string searchValueLastModifiedBy = null,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        IList<Benday.Demo7.Api.DomainModels.Lookup> SimpleSearch(
            string searchValue,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        IList<Lookup> GetAllByType(string lookupType);
    }
}