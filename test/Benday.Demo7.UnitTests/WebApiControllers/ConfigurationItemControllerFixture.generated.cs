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
    public partial class ConfigurationItemControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _ConfigurationItemServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.ConfigurationItemController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.ConfigurationItemController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.ConfigurationItemController(
                        new FakeLogger<ConfigurationItemController>(),
                        ConfigurationItemServiceInstance,
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
        
        private FakeConfigurationItemService _ConfigurationItemServiceInstance;
        public FakeConfigurationItemService ConfigurationItemServiceInstance
        {
            get
            {
                if (_ConfigurationItemServiceInstance == null)
                {
                    _ConfigurationItemServiceInstance =
                        new FakeConfigurationItemService();
                }
                
                return _ConfigurationItemServiceInstance;
            }
        }
        [TestMethod]
        public void ConfigurationItemController_GetConfigurationItems_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = ConfigurationItemTestUtility.CreateModels();
            
            ConfigurationItemServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetConfigurationItems();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(ConfigurationItemServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_GetConfigurationItem_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = ConfigurationItemTestUtility.CreateModel();
            
            ConfigurationItemServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<ConfigurationItem>(
                SystemUnderTest.GetConfigurationItem(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(ConfigurationItemServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_GetConfigurationItem_ForUnknownValueReturnsNotFound()
        {
            // arrange
            ConfigurationItemServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetConfigurationItem(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(ConfigurationItemServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_PostConfigurationItem_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = ConfigurationItemTestUtility.CreateModel(true);
            ConfigurationItemServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostConfigurationItem(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<ConfigurationItem>(
                actual,
                ConfigurationItemServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(ConfigurationItemServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, ConfigurationItemServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_PutConfigurationItem_SavesAndReturnsNoConfigurationItem()
        {
            // arrange
            var saveThis = ConfigurationItemTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutConfigurationItem(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(ConfigurationItemServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, ConfigurationItemServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_PutConfigurationItem_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = ConfigurationItemTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutConfigurationItem(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(ConfigurationItemServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_DeleteConfigurationItem_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = ConfigurationItemTestUtility.CreateModel();
            ConfigurationItemServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<ConfigurationItem>(
                SystemUnderTest.DeleteConfigurationItem(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(ConfigurationItemServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(ConfigurationItemServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void ConfigurationItemController_DeleteConfigurationItem_ForUnknownValueReturnsNotFound()
        {
            // arrange
            ConfigurationItemServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteConfigurationItem(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(ConfigurationItemServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(ConfigurationItemServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}