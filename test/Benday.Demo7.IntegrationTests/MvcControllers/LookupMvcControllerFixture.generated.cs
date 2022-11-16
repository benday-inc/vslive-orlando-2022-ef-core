using Benday.Demo7.Api.Security;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;

namespace Benday.Demo7.IntegrationTests.MvcControllers
{
    [TestClass]
    public partial class LookupMvcControllerFixture : WebUiIntegrationTestFixtureBase
    {
        [TestMethod]
        [Timeout(10000)]
        public async Task IndexReturnsWithoutError()
        {
            // arrange
            IndexReturnsWithoutErrorOnArrange();
            var url = "/lookup";
            
            InitializeSecurityWithMock(
                SecurityConstants.Policy_IsAdministrator, true);
            // act
            IndexReturnsWithoutErrorOnAct();
            var response = await Client.GetAsync(url);
            
            // assert
            IndexReturnsWithoutErrorOnAssert(response);
            await CheckForDependencyInjectionError(response);
            
            Assert.IsTrue(response.IsSuccessStatusCode,
                "Call to '{0}' failed with '{1} - '{2}'.",
                url, response.StatusCode, response.ReasonPhrase);
        }
        
        partial void IndexReturnsWithoutErrorOnArrange();
        partial void IndexReturnsWithoutErrorOnAct();
        partial void IndexReturnsWithoutErrorOnAssert(HttpResponseMessage response);
    }
}