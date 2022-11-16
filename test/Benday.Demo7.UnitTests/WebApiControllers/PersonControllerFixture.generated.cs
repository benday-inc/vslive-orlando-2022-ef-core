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
    public partial class PersonControllerFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
            _PersonServiceInstance = null;
            _LookupServiceInstance = null;
        }
        
        private Benday.Demo7.WebApi.Controllers.PersonController _systemUnderTest;
        
        private Benday.Demo7.WebApi.Controllers.PersonController SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest =
                        new Benday.Demo7.WebApi.Controllers.PersonController(
                        new FakeLogger<PersonController>(),
                        PersonServiceInstance,
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
        
        private FakePersonService _PersonServiceInstance;
        public FakePersonService PersonServiceInstance
        {
            get
            {
                if (_PersonServiceInstance == null)
                {
                    _PersonServiceInstance =
                        new FakePersonService();
                }
                
                return _PersonServiceInstance;
            }
        }
        [TestMethod]
        public void PersonController_GetPersons_CallsServiceAndReturnsList()
        {
            // arrange
            var expected = PersonTestUtility.CreateModels();
            
            PersonServiceInstance.GetAllReturnValue = expected;
            
            // act
            var actual = SystemUnderTest.GetPersons();
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(PersonServiceInstance.WasGetAllCalled, "GetAll was not called.");
        }
        
        [TestMethod]
        public void PersonController_GetPerson_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = PersonTestUtility.CreateModel();
            
            PersonServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Person>(
                SystemUnderTest.GetPerson(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(PersonServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void PersonController_GetPerson_ForUnknownValueReturnsNotFound()
        {
            // arrange
            PersonServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.GetPerson(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(PersonServiceInstance.WasGetByIdCalled, "GetById was not called.");
        }
        
        [TestMethod]
        public void PersonController_PostPerson_SavesAndReturnsCreatedAtActionResultWithNewId()
        {
            // arrange
            var saveThis = PersonTestUtility.CreateModel(true);
            PersonServiceInstance.OnSaveUpdateId = true;
            
            // act
            var actual = SystemUnderTest.PostPerson(saveThis);
            
            // assert
            var model = UnitTestUtility.AssertCreatedAtActionResultAndReturnModel<Person>(
                actual,
                PersonServiceInstance.OnSaveUpdateIdToThisValue,
                saveThis);
            
            Assert.IsTrue(PersonServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(model, PersonServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void PersonController_PutPerson_SavesAndReturnsNoPerson()
        {
            // arrange
            var saveThis = PersonTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutPerson(saveThis.Id, saveThis);
            
            // assert
            UnitTestUtility.AssertIsNoContentResult(actual);
            Assert.IsTrue(PersonServiceInstance.WasSaveCalled, "Save was not called.");
            Assert.AreSame(saveThis, PersonServiceInstance.SaveArgumentValue, "Wrong value was saved.");
        }
        
        [TestMethod]
        public void PersonController_PutPerson_ReturnsBadRequestWhenIdDoesNotMatchData()
        {
            // arrange
            var saveThis = PersonTestUtility.CreateModel();
            
            // act
            var actual = SystemUnderTest.PutPerson(saveThis.Id + 1, saveThis);
            
            // assert
            UnitTestUtility.AssertIsBadRequest(actual);
            Assert.IsFalse(PersonServiceInstance.WasSaveCalled, "Save should not be called.");
        }
        
        [TestMethod]
        public void PersonController_DeletePerson_ForKnownValueCallsServiceAndReturnsValue()
        {
            // arrange
            var expected = PersonTestUtility.CreateModel();
            PersonServiceInstance.GetByIdReturnValue = expected;
            
            // act
            var actual =
                UnitTestUtility.GetModel<Person>(
                SystemUnderTest.DeletePerson(1234));
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            Assert.AreSame(expected, actual, "Did not return the expected instance.");
            Assert.IsTrue(PersonServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsTrue(PersonServiceInstance.WasDeleteByIdCalled, "DeleteById was not called.");
        }
        
        [TestMethod]
        public void PersonController_DeletePerson_ForUnknownValueReturnsNotFound()
        {
            // arrange
            PersonServiceInstance.GetByIdReturnValue = null;
            
            // act
            var actual = SystemUnderTest.DeletePerson(1234);
            
            // assert
            Assert.IsNotNull(actual, "Return value was null.");
            UnitTestUtility.AssertIsHttpNotFound(actual);
            Assert.IsTrue(PersonServiceInstance.WasGetByIdCalled, "GetById was not called.");
            Assert.IsFalse(PersonServiceInstance.WasDeleteByIdCalled,
                "DeleteById should not be called.");
        }
    }
}