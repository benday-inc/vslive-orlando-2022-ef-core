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
    public partial class UserControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _UserServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.UserController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.UserController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.UserController(
                        new FakeLogger<UserController>(),
                        UserServiceInstance,
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
        
        private FakeUserService _UserServiceInstance;
        public FakeUserService UserServiceInstance
        {
            get
            {
                if (_UserServiceInstance == null)
                {
                    _UserServiceInstance =
                        new FakeUserService();
                }
                
                return _UserServiceInstance;
            }
        }
        [TestMethod]
        public void UserController_GetUsers_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = UserTestUtility.CreateModels();
            
            UserServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetUsers();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void UserController_GetUser_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = UserTestUtility.CreateModel();
            
            UserServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<User>(
                SystemUnderTest.GetUser(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void UserController_GetUser_ForUnknownValueReturnsNotFound()
        {
            // arrange
            UserServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetUser(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(UserServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void UserController_PostUser_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = UserTestUtility.CreateModel(true);
            UserServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostUser(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<User>(
                actual,
                UserServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(UserServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, UserServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void UserController_PutUser_SavesAndReturnsNoUser()
        {
            // arrange
            var saveThis = UserTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutUser(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(UserServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, UserServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void UserController_PutUser_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = UserTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutUser(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(UserServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void UserController_DeleteUser_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = UserTestUtility.CreateModel();
            UserServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<User>(
                SystemUnderTest.DeleteUser(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(UserServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(UserServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void UserController_DeleteUser_ForUnknownValueReturnsNotFound()
        {
            // arrange
            UserServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeleteUser(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(UserServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(UserServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}