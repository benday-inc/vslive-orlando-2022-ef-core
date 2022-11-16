using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.DomainModels;
using Benday.EfCore.SqlServer;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial interface ILogEntryService : IServiceLayer<LogEntry>
    {
        IList<LogEntry> Search(
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
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        IList<Benday.Demo7.Api.DomainModels.LogEntry> SimpleSearch(
            string searchValue,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100);
        
        
    }
}