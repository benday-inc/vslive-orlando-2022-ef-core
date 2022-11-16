using System;
using System.Collections.Generic;
using Benday.Demo7.Api;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.Utilities
{
    public static class UserTestUtility
    {
        public static List<Benday.Demo7.Api.DataAccess.Entities.UserEntity> CreateEntities(
            bool createAsUnsaved = true, bool onlyScalarProperties = true)
        {
            var returnValues = new List<Benday.Demo7.Api.DataAccess.Entities.UserEntity>();

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

        public static Benday.Demo7.Api.DataAccess.Entities.UserEntity CreateEntity(
            bool onlyScalarProperties = false
            )
        {
            var fromValue = new Benday.Demo7.Api.DataAccess.Entities.UserEntity
            {
                Username = UnitTestUtility.GetFakeValueForString("Username"),
                Source = UnitTestUtility.GetFakeValueForString("Source"),
                EmailAddress = UnitTestUtility.GetFakeValueForString("EmailAddress"),
                FirstName = UnitTestUtility.GetFakeValueForString("FirstName"),
                LastName = UnitTestUtility.GetFakeValueForString("LastName"),
                PhoneNumber = UnitTestUtility.GetFakeValueForString("PhoneNumber"),
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
                // fromValue.Claims =
                //	UnitTestUtility.GetFakeValueForUserClaim("Claims");
            }

            return fromValue;
        }

        public static Benday.Demo7.Api.DomainModels.User CreateModel(
            bool createAsUnsaved = true)
        {
            var fromValue = new Benday.Demo7.Api.DomainModels.User
            {
                Username = UnitTestUtility.GetFakeValueForString("Username"),
                Source = UnitTestUtility.GetFakeValueForString("Source"),
                EmailAddress = UnitTestUtility.GetFakeValueForString("EmailAddress"),
                FirstName = UnitTestUtility.GetFakeValueForString("FirstName"),
                LastName = UnitTestUtility.GetFakeValueForString("LastName"),
                PhoneNumber = UnitTestUtility.GetFakeValueForString("PhoneNumber"),
                // Claims = UnitTestUtility.GetFakeValueForUserClaim("Claims");,
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

        public static List<Benday.Demo7.Api.DomainModels.User> CreateModels(
            bool createAsUnsaved = true, int numberOfRecords = 10)
        {
            var returnValues = new List<Benday.Demo7.Api.DomainModels.User>();

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
            Benday.Demo7.Api.DomainModels.User fromValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue), $"{nameof(fromValue)} is null.");
            }

            fromValue.Username = UnitTestUtility.GetFakeValueForString("Modified Username");
            fromValue.Source = UnitTestUtility.GetFakeValueForString("Modified Source");
            fromValue.EmailAddress = UnitTestUtility.GetFakeValueForString("Modified EmailAddress");
            fromValue.FirstName = UnitTestUtility.GetFakeValueForString("Modified FirstName");
            fromValue.LastName = UnitTestUtility.GetFakeValueForString("Modified LastName");
            fromValue.PhoneNumber = UnitTestUtility.GetFakeValueForString("Modified PhoneNumber");
            // fromValue.Claims = UnitTestUtility.GetFakeValueForUserClaim("Modified Claims");
            fromValue.Status = UnitTestUtility.GetFakeValueForString("Modified Status");
            fromValue.CreatedBy = UnitTestUtility.GetFakeValueForString("Modified CreatedBy");
            fromValue.CreatedDate = UnitTestUtility.GetFakeValueForDateTime("Modified CreatedDate");
            fromValue.LastModifiedBy = UnitTestUtility.GetFakeValueForString("Modified LastModifiedBy");
            fromValue.LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("Modified LastModifiedDate");
            fromValue.Timestamp = UnitTestUtility.GetFakeValueForByteArray("Modified Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DomainModels.User> expected,
            IList<Benday.Demo7.Api.DataAccess.Entities.UserEntity> actual)
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
            Benday.Demo7.Api.DomainModels.User expected,
            Benday.Demo7.Api.DataAccess.Entities.UserEntity actual)
        {
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.Source, actual.Source, "Source");
            Assert.AreEqual<string>(expected.EmailAddress, actual.EmailAddress, "EmailAddress");
            Assert.AreEqual<string>(expected.FirstName, actual.FirstName, "FirstName");
            Assert.AreEqual<string>(expected.LastName, actual.LastName, "LastName");
            Assert.AreEqual<string>(expected.PhoneNumber, actual.PhoneNumber, "PhoneNumber");
            // Assert.AreEqual<UserClaim>(expected.Claims, actual.Claims, "Claims");
            Assert.AreEqual<int>(expected.Id, actual.Id, "Id");
            Assert.AreEqual<string>(expected.Status, actual.Status, "Status");
            Assert.AreEqual<string>(expected.CreatedBy, actual.CreatedBy, "CreatedBy");
            Assert.AreEqual<DateTime>(expected.CreatedDate, actual.CreatedDate, "CreatedDate");
            Assert.AreEqual<string>(expected.LastModifiedBy, actual.LastModifiedBy, "LastModifiedBy");
            Assert.AreEqual<DateTime>(expected.LastModifiedDate, actual.LastModifiedDate, "LastModifiedDate");
            Assert.AreEqual<byte[]>(expected.Timestamp, actual.Timestamp, "Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DataAccess.Entities.UserEntity> expected,
            IList<Benday.Demo7.Api.DomainModels.User> actual)
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
            Benday.Demo7.Api.DataAccess.Entities.UserEntity expected,
            Benday.Demo7.Api.DomainModels.User actual)
        {
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.Source, actual.Source, "Source");
            Assert.AreEqual<string>(expected.EmailAddress, actual.EmailAddress, "EmailAddress");
            Assert.AreEqual<string>(expected.FirstName, actual.FirstName, "FirstName");
            Assert.AreEqual<string>(expected.LastName, actual.LastName, "LastName");
            Assert.AreEqual<string>(expected.PhoneNumber, actual.PhoneNumber, "PhoneNumber");
            // Assert.AreEqual<UserClaim>(expected.Claims, actual.Claims, "Claims");
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
