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
    public partial class FeedbackControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _FeedbackServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.FeedbackController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.FeedbackController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.FeedbackController(
                        new FakeLogger<FeedbackController>(),
                        FeedbackServiceInstance,
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
        
        private FakeFeedbackService _FeedbackServiceInstance;
        public FakeFeedbackService FeedbackServiceInstance
        {
            get
            {
                if (_FeedbackServiceInstance == null)
                {
                    _FeedbackServiceInstance =
                        new FakeFeedbackService();
                }
                
                return _FeedbackServiceInstance;
            }
        }
        [TestMethod]
        public void FeedbackController_GetFeedbacks_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = FeedbackTestUtility.CreateModels();
            
            FeedbackServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetFeedbacks();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(FeedbackServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void FeedbackController_GetFeedback_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = FeedbackTestUtility.CreateModel();
            
            FeedbackServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Feedback>(
                SystemUnderTest.GetFeedback(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(FeedbackServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void FeedbackController_GetFeedback_ForUnknownValueReturnsNotFound()
        {
            // arrange
            FeedbackServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetFeedback(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(FeedbackServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void FeedbackController_PostFeedback_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = FeedbackTestUtility.CreateModel(true);
            FeedbackServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostFeedback(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<Feedback>(
                actual,
                FeedbackServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(FeedbackServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, FeedbackServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void FeedbackController_PutFeedback_SavesAndReturnsNoFeedback()
        {
            // arrange
            var saveThis = FeedbackTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutFeedback(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(FeedbackServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, FeedbackServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void FeedbackController_PutFeedback_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = FeedbackTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutFeedback(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(FeedbackServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void FeedbackController_DeleteFeedback_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = FeedbackTestUtility.CreateModel();
            FeedbackServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Feedback>(
                SystemUnderTest.DeleteFeedback(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(FeedbackServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(FeedbackServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void FeedbackController_DeleteFeedback_ForUnknownValueReturnsNotFound()
        {
            // arrange
            FeedbackServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteFeedback(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(FeedbackServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(FeedbackServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}