using Benday.Demo7.Api.ServiceLayers;
using Benday.EfCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Common;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.UnitTests.Fakes.ServiceLayers
{
    public partial class FakeLookupService :
        FakeServiceLayer<Benday.Demo7.Api.DomainModels.Lookup>, ILookupService
    {
        public IList<Benday.Demo7.Api.DomainModels.Lookup> SearchUsingParametersReturnValue { get; set; }
        public bool WasSearchUsingParametersCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> Search(
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
            
            
            string sortBy = null, string sortByDirection = null,
            int maxNumberOfResults = 100)
        {
            WasSearchUsingParametersCalled = true;
            
            return SearchUsingParametersReturnValue;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> SimpleSearchReturnValue { get; set; }
        public bool WasSimpleSearchCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> SimpleSearch(
            string searchValue, string sortBy = null, string sortByDirection = null, int maxNumberOfResults = 100)
        {
            WasSimpleSearchCalled = true;
            
            return SimpleSearchReturnValue;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> GetAllByTypeReturnValue { get; set; }
        public bool WasGetAllByTypeCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> GetAllByType(string lookupType)
        {
            WasGetAllByTypeCalled = true;
            
            return GetAllByTypeReturnValue;
        }
    }
}