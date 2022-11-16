using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.DomainModels;
using Benday.EfCore.SqlServer;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial interface IConfigurationItemService : IServiceLayer<ConfigurationItem>
    {
        IList<ConfigurationItem> Search(
            SearchMethod searchTypeCategory = SearchMethod.Contains,
            string searchValueCategory = null,
            SearchMethod searchTypeConfigurationKey = SearchMethod.Contains,
            string searchValueConfigurationKey = null,
            SearchMethod searchTypeDescription = SearchMethod.Contains,
            string searchValueDescription = null,
            SearchMethod searchTypeConfigurationValue = SearchMethod.Contains,
            string searchValueConfigurationValue = null,
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
        
        IList<Benday.Demo7.Api.DomainModels.ConfigurationItem> SimpleSearch(
            string searchValue,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        
    }
}