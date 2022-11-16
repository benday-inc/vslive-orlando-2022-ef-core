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
    public partial class LogEntryControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _LogEntryServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.LogEntryController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.LogEntryController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.LogEntryController(
                        new FakeLogger<LogEntryController>(),
                        LogEntryServiceInstance,
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
        
        private FakeLogEntryService _LogEntryServiceInstance;
        public FakeLogEntryService LogEntryServiceInstance
        {
            get
            {
                if (_LogEntryServiceInstance == null)
                {
                    _LogEntryServiceInstance =
                        new FakeLogEntryService();
                }
                
                return _LogEntryServiceInstance;
            }
        }
        [TestMethod]
        public void LogEntryController_GetLogEntrys_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = LogEntryTestUtility.CreateModels();
            
            LogEntryServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetLogEntrys();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LogEntryServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void LogEntryController_GetLogEntry_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = LogEntryTestUtility.CreateModel();
            
            LogEntryServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<LogEntry>(
                SystemUnderTest.GetLogEntry(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LogEntryServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void LogEntryController_GetLogEntry_ForUnknownValueReturnsNotFound()
        {
            // arrange
            LogEntryServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetLogEntry(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(LogEntryServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void LogEntryController_PostLogEntry_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = LogEntryTestUtility.CreateModel(true);
            LogEntryServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostLogEntry(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<LogEntry>(
                actual,
                LogEntryServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(LogEntryServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, LogEntryServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void LogEntryController_PutLogEntry_SavesAndReturnsNoLogEntry()
        {
            // arrange
            var saveThis = LogEntryTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutLogEntry(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(LogEntryServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, LogEntryServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void LogEntryController_PutLogEntry_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = LogEntryTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutLogEntry(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(LogEntryServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void LogEntryController_DeleteLogEntry_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = LogEntryTestUtility.CreateModel();
            LogEntryServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<LogEntry>(
                SystemUnderTest.DeleteLogEntry(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(LogEntryServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(LogEntryServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void LogEntryController_DeleteLogEntry_ForUnknownValueReturnsNotFound()
        {
            // arrange
            LogEntryServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteLogEntry(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(LogEntryServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(LogEntryServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}