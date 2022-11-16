using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.DomainModels;
using Benday.EfCore.SqlServer;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial interface IPersonService : IServiceLayer<Person>
    {
        IList<Person> Search(
            SearchMethod searchTypeFirstName = SearchMethod.Contains,
            string searchValueFirstName = null,
            SearchMethod searchTypeLastName = SearchMethod.Contains,
            string searchValueLastName = null,
            SearchMethod searchTypeEmailAddress = SearchMethod.Contains,
            string searchValueEmailAddress = null,
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
        
        IList<Benday.Demo7.Api.DomainModels.Person> SimpleSearch(
            string searchValue,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        
    }
}