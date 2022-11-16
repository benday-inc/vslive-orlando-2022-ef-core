using Benday.Demo7.Api.ServiceLayers;
using Benday.EfCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Common;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.UnitTests.Fakes.ServiceLayers
{
    public partial class FakePersonService :
        FakeServiceLayer<Benday.Demo7.Api.DomainModels.Person>, IPersonService
    {
        public IList<Benday.Demo7.Api.DomainModels.Person> SearchUsingParametersReturnValue { get; set; }
        public bool WasSearchUsingParametersCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> Search(
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
            
            
            string sortBy = null, string sortByDirection = null,
            int maxNumberOfResults = 100)
        {
            WasSearchUsingParametersCalled = true;
            
            return SearchUsingParametersReturnValue;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> SimpleSearchReturnValue { get; set; }
        public bool WasSimpleSearchCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> SimpleSearch(
            string searchValue, string sortBy = null, string sortByDirection = null, int maxNumberOfResults = 100)
        {
            WasSimpleSearchCalled = true;
            
            return SimpleSearchReturnValue;
        }
    }
}