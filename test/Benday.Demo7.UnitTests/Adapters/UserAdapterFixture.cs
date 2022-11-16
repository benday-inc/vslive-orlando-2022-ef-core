using System.Collections.Generic;
using Benday.Demo7.Api.Adapters;
using Benday.Demo7.UnitTests.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.Adapters
{
    [TestClass]
    public class UserAdapterFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }

        private UserAdapter _systemUnderTest;
        public UserAdapter SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new UserAdapter();
                }

                return _systemUnderTest;
            }
        }

        [TestMethod]
        public void AdaptUserFromEntityToModel()
        {
            // arrange
            var fromValue = UserTestUtility.CreateEntity();
            var toValue = new Benday.Demo7.Api.DomainModels.User();

            // act
            SystemUnderTest.Adapt(fromValue, toValue);

            // assert
            UserTestUtility.AssertAreEqual(fromValue, toValue);
            Assert.IsFalse(toValue.HasChanges(), "Should not have changes after adapt.");
        }

        [TestMethod]
        public void AdaptUserFromEntitiesToModels_ToEmpty()
        {
            // arrange
            var fromValues = UserTestUtility.CreateEntities();
            var toValues = new List<Benday.Demo7.Api.DomainModels.User>();

            // act
            SystemUnderTest.Adapt(fromValues, toValues);

            // assert
            Assert.AreNotEqual<int>(0, toValues.Count, "There should be values.");
            UserTestUtility.AssertAreEqual(fromValues, toValues);
        }

        [TestMethod]
        public void AdaptUserFromEntitiesToModels_MergesByIdForExistingValues()
        {
            // arrange
            var fromValues = UserTestUtility.CreateEntities(false);

            foreach (var fromValue in fromValues)
            {
                Assert.AreNotEqual<int>(0, fromValue.Id, "Value wasn't 'saved' before start of test.");
            }

            var toValues = new List<Benday.Demo7.Api.DomainModels.User>();

            // adapt first time
            SystemUnderTest.Adapt(fromValues, toValues);

            var originalValuesById = GetOriginalValuesById(toValues);

            // act
            // call adapt again
            SystemUnderTest.Adapt(fromValues, toValues);

            // assert
            Assert.AreNotEqual<int>(0, toValues.Count, "There should be values.");
            AssertValuesStillExistAndIdDidNotChange(toValues, originalValuesById);
            UserTestUtility.AssertAreEqual(fromValues, toValues);
        }

        private static void AssertValuesStillExistAndIdDidNotChange(
            List<Benday.Demo7.Api.DomainModels.User> actualValues,
            Dictionary<int, Benday.Demo7.Api.DomainModels.User> expectedValuesById)
        {
            Assert.AreEqual<int>(expectedValuesById.Count, actualValues.Count, "Item count changed.");

            Benday.Demo7.Api.DomainModels.User expected;

            foreach (var expectedId in expectedValuesById.Keys)
            {
                expected = expectedValuesById.GetValueOrDefault(expectedId);

                Assert.IsNotNull(expected, "Expected value should not be null.");

                Assert.AreEqual<int>(expectedId, expected.Id, "Id value should not have changed.");

                Assert.IsTrue(actualValues.Contains(expected), "Value should exist in actual values.");
            }
        }

        private static Dictionary<int, Benday.Demo7.Api.DomainModels.User> GetOriginalValuesById(
            List<Benday.Demo7.Api.DomainModels.User> values)
        {
            var originalValuesById =
                new Dictionary<int, Benday.Demo7.Api.DomainModels.User>();

            foreach (var item in values)
            {
                originalValuesById.Add(item.Id, item);
            }

            return originalValuesById;
        }

        [TestMethod]
        public void AdaptUserFromModelToEntity()
        {
            // arrange
            var fromValue = UserTestUtility.CreateModel();
            var toValue = new Benday.Demo7.Api.DataAccess.Entities.UserEntity();

            // act
            SystemUnderTest.Adapt(fromValue, toValue);

            // assert
            UserTestUtility.AssertAreEqual(fromValue, toValue);
        }

        [TestMethod]
        public void AdaptUserFromModelsToEntities_ToEmpty()
        {
            // arrange
            var fromValues = UserTestUtility.CreateModels();
            var toValues = new List<Benday.Demo7.Api.DataAccess.Entities.UserEntity>();

            // act
            SystemUnderTest.Adapt(fromValues, toValues);

            // assert
            Assert.AreNotEqual<int>(0, toValues.Count, "There should be values.");
            UserTestUtility.AssertAreEqual(fromValues, toValues);
        }

        [TestMethod]
        public void AdaptUserFromModelsToEntities_MergesByIdForExistingValues()
        {
            // arrange
            var fromValues = UserTestUtility.CreateModels(false);
            var toValues = new List<Benday.Demo7.Api.DataAccess.Entities.UserEntity>();

            foreach (var fromValue in fromValues)
            {
                Assert.AreNotEqual<int>(0, fromValue.Id, "Value wasn't 'saved' before start of test.");
            }

            // adapt first time
            SystemUnderTest.Adapt(fromValues, toValues);

            var originalValuesById = GetOriginalValuesById(toValues);

            // act
            // call adapt again
            SystemUnderTest.Adapt(fromValues, toValues);

            // assert
            Assert.AreNotEqual<int>(0, toValues.Count, "There should be values.");
            AssertValuesStillExistAndIdDidNotChange(toValues, originalValuesById);
            UserTestUtility.AssertAreEqual(fromValues, toValues);
        }

        private static void AssertValuesStillExistAndIdDidNotChange(
            List<Benday.Demo7.Api.DataAccess.Entities.UserEntity> actualValues,
            Dictionary<int, Benday.Demo7.Api.DataAccess.Entities.UserEntity> expectedValuesById)
        {
            Assert.AreEqual<int>(expectedValuesById.Count, actualValues.Count, "Item count changed.");

            Benday.Demo7.Api.DataAccess.Entities.UserEntity expected;

            foreach (var expectedId in expectedValuesById.Keys)
            {
                expected = expectedValuesById.GetValueOrDefault(expectedId);

                Assert.IsNotNull(expected, "Expected value should not be null.");

                Assert.AreEqual<int>(expectedId, expected.Id, "Id value should not have changed.");

                Assert.IsTrue(actualValues.Contains(expected), "Value should exist in actual values.");
            }
        }

        private static Dictionary<int, Benday.Demo7.Api.DataAccess.Entities.UserEntity> GetOriginalValuesById(
            List<Benday.Demo7.Api.DataAccess.Entities.UserEntity> values)
        {
            var originalValuesById =
                new Dictionary<int, Benday.Demo7.Api.DataAccess.Entities.UserEntity>();

            foreach (var item in values)
            {
                originalValuesById.Add(item.Id, item);
            }

            return originalValuesById;
        }
    }
}
