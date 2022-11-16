using System;
using System.Collections.Generic;
using Benday.Demo7.Api;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.Utilities
{
    public static class UserClaimTestUtility
    {
        public static List<Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity> CreateEntities(
            bool createAsUnsaved = true, bool onlyScalarProperties = true)
        {
            var returnValues = new List<Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity>();

            for (var i = 0; i < 10; i++)
            {
                var temp = CreateEntity(onlyScalarProperties);

                returnValues.Add(temp);

                if (createAsUnsaved == false)
                {
                    temp.Id = i + 1;
                }
            }

            return returnValues;
        }

        public static Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity CreateEntity(
            bool onlyScalarProperties = false
            )
        {
            var fromValue = new Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity
            {
                Username = UnitTestUtility.GetFakeValueForString("Username"),
                ClaimName = UnitTestUtility.GetFakeValueForString("ClaimName"),
                ClaimValue = UnitTestUtility.GetFakeValueForString("ClaimValue"),
                UserId = UnitTestUtility.GetFakeValueForInt("UserId"),
                ClaimLogicType = UnitTestUtility.GetFakeValueForString("ClaimLogicType"),
                StartDate = UnitTestUtility.GetFakeValueForDateTime("StartDate"),
                EndDate = UnitTestUtility.GetFakeValueForDateTime("EndDate"),
                Id = UnitTestUtility.GetFakeValueForInt("Id"),
                Status = UnitTestUtility.GetFakeValueForString("Status"),
                CreatedBy = UnitTestUtility.GetFakeValueForString("CreatedBy"),
                CreatedDate = UnitTestUtility.GetFakeValueForDateTime("CreatedDate"),
                LastModifiedBy = UnitTestUtility.GetFakeValueForString("LastModifiedBy"),
                LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("LastModifiedDate"),
                Timestamp = UnitTestUtility.GetFakeValueForByteArray("Timestamp")
            };
            if (onlyScalarProperties == false)
            {
                fromValue.User =
                    UserTestUtility.CreateEntity(true);
            }

            return fromValue;
        }

        public static Benday.Demo7.Api.DomainModels.UserClaim CreateModel(
            bool createAsUnsaved = true)
        {
            var fromValue = new Benday.Demo7.Api.DomainModels.UserClaim
            {
                Username = UnitTestUtility.GetFakeValueForString("Username"),
                ClaimName = UnitTestUtility.GetFakeValueForString("ClaimName"),
                ClaimValue = UnitTestUtility.GetFakeValueForString("ClaimValue"),
                UserId = UnitTestUtility.GetFakeValueForInt("UserId"),
                ClaimLogicType = UnitTestUtility.GetFakeValueForString("ClaimLogicType"),
                StartDate = UnitTestUtility.GetFakeValueForDateTime("StartDate"),
                EndDate = UnitTestUtility.GetFakeValueForDateTime("EndDate"),
                Id = UnitTestUtility.GetFakeValueForInt("Id"),
                Status = UnitTestUtility.GetFakeValueForString("Status"),
                CreatedBy = UnitTestUtility.GetFakeValueForString("CreatedBy"),
                CreatedDate = UnitTestUtility.GetFakeValueForDateTime("CreatedDate"),
                LastModifiedBy = UnitTestUtility.GetFakeValueForString("LastModifiedBy"),
                LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("LastModifiedDate"),
                Timestamp = UnitTestUtility.GetFakeValueForByteArray("Timestamp")
            };
            if (createAsUnsaved == true)
            {
                fromValue.Id = 0;
                fromValue.CreatedDate = default;
                fromValue.LastModifiedDate = default;
                fromValue.CreatedBy = null;
                fromValue.LastModifiedBy = null;
            }

            return fromValue;
        }

        public static List<Benday.Demo7.Api.DomainModels.UserClaim> CreateModels(
            bool createAsUnsaved = true, int numberOfRecords = 10)
        {
            var returnValues = new List<Benday.Demo7.Api.DomainModels.UserClaim>();

            for (var i = 0; i < numberOfRecords; i++)
            {
                var temp = CreateModel(createAsUnsaved);

                returnValues.Add(temp);

                if (createAsUnsaved == false)
                {
                    temp.Id = i + 1;
                }
                else
                {
                    temp.Id = ApiConstants.UnsavedId;
                    temp.CreatedDate = default;
                    temp.LastModifiedDate = default;
                    temp.CreatedBy = null;
                    temp.LastModifiedBy = null;
                }
            }

            return returnValues;
        }

        public static void ModifyModel(
            Benday.Demo7.Api.DomainModels.UserClaim fromValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue), $"{nameof(fromValue)} is null.");
            }

            fromValue.Username = UnitTestUtility.GetFakeValueForString("Modified Username");
            fromValue.ClaimName = UnitTestUtility.GetFakeValueForString("Modified ClaimName");
            fromValue.ClaimValue = UnitTestUtility.GetFakeValueForString("Modified ClaimValue");
            fromValue.UserId = UnitTestUtility.GetFakeValueForInt("Modified UserId");
            fromValue.ClaimLogicType = UnitTestUtility.GetFakeValueForString("Modified ClaimLogicType");
            fromValue.StartDate = UnitTestUtility.GetFakeValueForDateTime("Modified StartDate");
            fromValue.EndDate = UnitTestUtility.GetFakeValueForDateTime("Modified EndDate");
            fromValue.Status = UnitTestUtility.GetFakeValueForString("Modified Status");
            fromValue.CreatedBy = UnitTestUtility.GetFakeValueForString("Modified CreatedBy");
            fromValue.CreatedDate = UnitTestUtility.GetFakeValueForDateTime("Modified CreatedDate");
            fromValue.LastModifiedBy = UnitTestUtility.GetFakeValueForString("Modified LastModifiedBy");
            fromValue.LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("Modified LastModifiedDate");
            fromValue.Timestamp = UnitTestUtility.GetFakeValueForByteArray("Modified Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DomainModels.UserClaim> expected,
            IList<Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity> actual)
        {
            Assert.IsNotNull(expected, "Expected was null.");
            Assert.IsNotNull(actual, "Actual was null.");
            Assert.AreEqual<int>(expected.Count, actual.Count, "Item count should match.");

            for (var i = 0; i < expected.Count; i++)
            {
                AssertAreEqual(expected[i], actual[i]);
            }
        }

        public static void AssertAreEqual(
            Benday.Demo7.Api.DomainModels.UserClaim expected,
            Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity actual)
        {
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.ClaimName, actual.ClaimName, "ClaimName");
            Assert.AreEqual<string>(expected.ClaimValue, actual.ClaimValue, "ClaimValue");
            Assert.AreEqual<int>(expected.UserId, actual.UserId, "UserId");
            Assert.AreEqual<string>(expected.ClaimLogicType, actual.ClaimLogicType, "ClaimLogicType");
            Assert.AreEqual<DateTime>(expected.StartDate, actual.StartDate, "StartDate");
            Assert.AreEqual<DateTime>(expected.EndDate, actual.EndDate, "EndDate");
            Assert.AreEqual<int>(expected.Id, actual.Id, "Id");
            Assert.AreEqual<string>(expected.Status, actual.Status, "Status");
            Assert.AreEqual<string>(expected.CreatedBy, actual.CreatedBy, "CreatedBy");
            Assert.AreEqual<DateTime>(expected.CreatedDate, actual.CreatedDate, "CreatedDate");
            Assert.AreEqual<string>(expected.LastModifiedBy, actual.LastModifiedBy, "LastModifiedBy");
            Assert.AreEqual<DateTime>(expected.LastModifiedDate, actual.LastModifiedDate, "LastModifiedDate");
            Assert.AreEqual<byte[]>(expected.Timestamp, actual.Timestamp, "Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity> expected,
            IList<Benday.Demo7.Api.DomainModels.UserClaim> actual)
        {
            Assert.IsNotNull(expected, "Expected was null.");
            Assert.IsNotNull(actual, "Actual was null.");
            Assert.AreEqual<int>(expected.Count, actual.Count, "Item count should match.");

            for (var i = 0; i < expected.Count; i++)
            {
                AssertAreEqual(expected[i], actual[i]);
            }
        }

        public static void AssertAreEqual(
            Benday.Demo7.Api.DataAccess.Entities.UserClaimEntity expected,
            Benday.Demo7.Api.DomainModels.UserClaim actual)
        {
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.ClaimName, actual.ClaimName, "ClaimName");
            Assert.AreEqual<string>(expected.ClaimValue, actual.ClaimValue, "ClaimValue");
            Assert.AreEqual<int>(expected.UserId, actual.UserId, "UserId");
            Assert.AreEqual<string>(expected.ClaimLogicType, actual.ClaimLogicType, "ClaimLogicType");
            Assert.AreEqual<DateTime>(expected.StartDate, actual.StartDate, "StartDate");
            Assert.AreEqual<DateTime>(expected.EndDate, actual.EndDate, "EndDate");
            Assert.AreEqual<int>(expected.Id, actual.Id, "Id");
            Assert.AreEqual<string>(expected.Status, actual.Status, "Status");
            Assert.AreEqual<string>(expected.CreatedBy, actual.CreatedBy, "CreatedBy");
            Assert.AreEqual<DateTime>(expected.CreatedDate, actual.CreatedDate, "CreatedDate");
            Assert.AreEqual<string>(expected.LastModifiedBy, actual.LastModifiedBy, "LastModifiedBy");
            Assert.AreEqual<DateTime>(expected.LastModifiedDate, actual.LastModifiedDate, "LastModifiedDate");
            Assert.AreEqual<byte[]>(expected.Timestamp, actual.Timestamp, "Timestamp");
        }
    }
}
