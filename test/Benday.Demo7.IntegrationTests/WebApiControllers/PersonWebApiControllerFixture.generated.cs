using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Net.Http;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Benday.Demo7.IntegrationTests.WebApiControllers
{
    [TestClass]
    public partial class PersonWebApiControllerFixture : WebApiIntegrationTestFixtureBase
    {
        [TestMethod]
        [Timeout(10000)]
        public async Task GetAllReturnsWithoutError()
        {
            // arrange
            GetAllReturnsWithoutErrorOnArrange();
            var url = "/api/person";
            
            SetIsAuthorized(true);
            
            // act
            GetAllReturnsWithoutErrorOnAct();
            var response = await Client.GetAsync(url);
            
            // assert
            GetAllReturnsWithoutErrorOnAssert(response);
            await CheckForDependencyInjectionError(response);
            
            Assert.IsTrue(response.IsSuccessStatusCode,
                "Call to '{0}' failed with '{1} - '{2}'.",
                url, response.StatusCode, response.ReasonPhrase);
        }
        
        partial void GetAllReturnsWithoutErrorOnArrange();
        partial void GetAllReturnsWithoutErrorOnAct();
        partial void GetAllReturnsWithoutErrorOnAssert(HttpResponseMessage response);
    }
}