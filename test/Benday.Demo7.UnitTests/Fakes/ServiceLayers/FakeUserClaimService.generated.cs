using Benday.Demo7.Api.ServiceLayers;
using Benday.EfCore.SqlServer;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Common;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.UnitTests.Fakes.ServiceLayers
{
    public partial class FakeUserClaimService :
        FakeServiceLayer<Benday.Demo7.Api.DomainModels.UserClaim>, IUserClaimService
    {
        public IList<Benday.Demo7.Api.DomainModels.UserClaim> SearchUsingParametersReturnValue { get; set; }
        public bool WasSearchUsingParametersCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.UserClaim> Search(
            SearchMethod searchTypeUsername = SearchMethod.Contains,
            string searchValueUsername = null,
            SearchMethod searchTypeClaimName = SearchMethod.Contains,
            string searchValueClaimName = null,
            SearchMethod searchTypeClaimValue = SearchMethod.Contains,
            string searchValueClaimValue = null,
            SearchMethod searchTypeUserId = SearchMethod.Skip,
            int searchValueUserId = 0,
            SearchMethod searchTypeClaimLogicType = SearchMethod.Contains,
            string searchValueClaimLogicType = null,
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
        
        public IList<Benday.Demo7.Api.DomainModels.UserClaim> SimpleSearchReturnValue { get; set; }
        public bool WasSimpleSearchCalled { get; set; }
        
        public IList<Benday.Demo7.Api.DomainModels.UserClaim> SimpleSearch(
            string searchValue, string sortBy = null, string sortByDirection = null, int maxNumberOfResults = 100)
        {
            WasSimpleSearchCalled = true;
            
            return SimpleSearchReturnValue;
        }
    }
}