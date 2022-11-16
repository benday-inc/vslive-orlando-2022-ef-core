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
    public partial class LookupControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.LookupController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.LookupController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.LookupController(
                        new FakeLogger<LookupController>(),
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
        [TestMethod]
        public void LookupController_GetLookups_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = LookupTestUtility.CreateModels();
            
            LookupServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetLookups();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LookupServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void LookupController_GetLookup_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = LookupTestUtility.CreateModel();
            
            LookupServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Lookup>(
                SystemUnderTest.GetLookup(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LookupServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void LookupController_GetLookup_ForUnknownValueReturnsNotFound()
        {
            // arrange
            LookupServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetLookup(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(LookupServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void LookupController_PostLookup_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = LookupTestUtility.CreateModel(true);
            LookupServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostLookup(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<Lookup>(
                actual,
                LookupServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(LookupServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, LookupServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void LookupController_PutLookup_SavesAndReturnsNoLookup()
        {
            // arrange
            var saveThis = LookupTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutLookup(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(LookupServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, LookupServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void LookupController_PutLookup_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = LookupTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutLookup(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(LookupServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void LookupController_DeleteLookup_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = LookupTestUtility.CreateModel();
            LookupServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Lookup>(
                SystemUnderTest.DeleteLookup(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LookupServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(LookupServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void LookupController_DeleteLookup_ForUnknownValueReturnsNotFound()
        {
            // arrange
            LookupServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteLookup(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(LookupServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(LookupServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
        [TestMethod]
        public void LookupController_GetAllByType_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = LookupTestUtility.CreateModels();
            
            LookupServiceInstance.GetAllByTypeReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetLookupsByType("1234");
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LookupServiceInstance.WasGetAllByTypeCalled, "GetLookupsByType was not called.");
        }
    }
}