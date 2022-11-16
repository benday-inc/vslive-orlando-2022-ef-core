using Benday.Demo7.Api.ServiceLayers;
using Benday.EfCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Common;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.UnitTests.Fakes.ServiceLayers
{
    public partial class FakeLogEntryService :
        FakeServiceLayer<Benday.Demo7.Api.DomainModels.LogEntry>, ILogEntryService
    {
        public IList<Benday.Demo7.Api.DomainModels.LogEntry> SearchUsingParametersReturnValue { get; set; }
        public bool WasSearchUsingParametersCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.LogEntry> Search(
            SearchMethod searchTypeId = SearchMethod.Skip,
            int searchValueId = 0,
            SearchMethod searchTypeCategory = SearchMethod.Contains,
            string searchValueCategory = null,
            SearchMethod searchTypeLogLevel = SearchMethod.Contains,
            string searchValueLogLevel = null,
            SearchMethod searchTypeLogText = SearchMethod.Contains,
            string searchValueLogText = null,
            SearchMethod searchTypeExceptionText = SearchMethod.Contains,
            string searchValueExceptionText = null,
            SearchMethod searchTypeEventId = SearchMethod.Contains,
            string searchValueEventId = null,
            SearchMethod searchTypeState = SearchMethod.Contains,
            string searchValueState = null,
            
            
            string sortBy = null, string sortByDirection = null,
            int maxNumberOfResults = 100)
        {
            WasSearchUsingParametersCalled = true;
            
            return SearchUsingParametersReturnValue;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.LogEntry> SimpleSearchReturnValue { get; set; }
        public bool WasSimpleSearchCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.LogEntry> SimpleSearch(
            string searchValue, string sortBy = null, string sortByDirection = null, int maxNumberOfResults = 100)
        {
            WasSimpleSearchCalled = true;
            
            return SimpleSearchReturnValue;
        }
    }
}