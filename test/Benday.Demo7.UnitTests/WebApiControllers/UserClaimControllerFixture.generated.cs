using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.DomainModels;
using Benday.Demo7.Api.Adapters;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Benday.Demo7.UnitTests.Fakes;
using Benday.Demo7.UnitTests.Fakes.ServiceLayers;
using Benday.Demo7.UnitTests.Utilities;
using Benday.Demo7.WebApi.Controllers;
using Benday.Demo7.Api;

namespace Benday.Demo7.UnitTests.WebApiControllers
{
    [TestClass]
    public partial class UserClaimControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _UserClaimServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.UserClaimController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.UserClaimController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.UserClaimController(
                        new FakeLogger<UserClaimController>(),
                        UserClaimServiceInstance,
                        LookupServiceInstance);
                }
                
                return _systemUnderTest;
            }
        }
        
        private FakeLookupService _LookupServiceInstance;
        public FakeLookupService LookupServiceInstance
        {
            get
            {
                if (_LookupServiceInstance == null)
                {
                    _LookupServiceInstance =
                        new FakeLookupService();
                }
                
                return _LookupServiceInstance;
            }
        }
        
        private FakeUserClaimService _UserClaimServiceInstance;
        public FakeUserClaimService UserClaimServiceInstance
        {
            get
            {
                if (_UserClaimServiceInstance == null)
                {
                    _UserClaimServiceInstance =
                        new FakeUserClaimService();
                }
                
                return _UserClaimServiceInstance;
            }
        }
        [TestMethod]
        public void UserClaimController_GetUserClaims_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = UserClaimTestUtility.CreateModels();
            
            UserClaimServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetUserClaims();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserClaimServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void UserClaimController_GetUserClaim_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = UserClaimTestUtility.CreateModel();
            
            UserClaimServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<UserClaim>(
                SystemUnderTest.GetUserClaim(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserClaimServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void UserClaimController_GetUserClaim_ForUnknownValueReturnsNotFound()
        {
            // arrange
            UserClaimServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetUserClaim(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(UserClaimServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void UserClaimController_PostUserClaim_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = UserClaimTestUtility.CreateModel(true);
            UserClaimServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostUserClaim(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<UserClaim>(
                actual,
                UserClaimServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(UserClaimServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, UserClaimServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void UserClaimController_PutUserClaim_SavesAndReturnsNoUserClaim()
        {
            // arrange
            var saveThis = UserClaimTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutUserClaim(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(UserClaimServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, UserClaimServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void UserClaimController_PutUserClaim_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = UserClaimTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutUserClaim(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(UserClaimServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void UserClaimController_DeleteUserClaim_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = UserClaimTestUtility.CreateModel();
            UserClaimServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<UserClaim>(
                SystemUnderTest.DeleteUserClaim(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserClaimServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(UserClaimServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void UserClaimController_DeleteUserClaim_ForUnknownValueReturnsNotFound()
        {
            // arrange
            UserClaimServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteUserClaim(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(UserClaimServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(UserClaimServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}