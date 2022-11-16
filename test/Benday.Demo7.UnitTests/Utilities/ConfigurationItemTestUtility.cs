using System;
using System.Collections.Generic;
using Benday.Demo7.Api;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.Utilities
{
    public static class ConfigurationItemTestUtility
    {
        public static List<Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity> CreateEntities(
            bool createAsUnsaved = true, bool onlyScalarProperties = true)
        {
            var returnValues = new List<Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity>();

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

        public static Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity CreateEntity(
            bool onlyScalarProperties = false
            )
        {
            var fromValue = new Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity
            {
                Category = UnitTestUtility.GetFakeValueForString("Category"),
                ConfigurationKey = UnitTestUtility.GetFakeValueForString("ConfigurationKey"),
                Description = UnitTestUtility.GetFakeValueForString("Description"),
                ConfigurationValue = UnitTestUtility.GetFakeValueForString("ConfigurationValue"),
                Id = UnitTestUtility.GetFakeValueForInt("Id"),
                Status = UnitTestUtility.GetFakeValueForString("Status"),
                CreatedBy = UnitTestUtility.GetFakeValueForString("CreatedBy"),
                CreatedDate = UnitTestUtility.GetFakeValueForDateTime("CreatedDate"),
                LastModifiedBy = UnitTestUtility.GetFakeValueForString("LastModifiedBy"),
                LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("LastModifiedDate"),
                Timestamp = UnitTestUtility.GetFakeValueForByteArray("Timestamp")
            };

            return fromValue;
        }

        public static Benday.Demo7.Api.DomainModels.ConfigurationItem CreateModel(
            bool createAsUnsaved = true)
        {
            var fromValue = new Benday.Demo7.Api.DomainModels.ConfigurationItem
            {
                Category = UnitTestUtility.GetFakeValueForString("Category"),
                ConfigurationKey = UnitTestUtility.GetFakeValueForString("ConfigurationKey"),
                Description = UnitTestUtility.GetFakeValueForString("Description"),
                ConfigurationValue = UnitTestUtility.GetFakeValueForString("ConfigurationValue"),
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

        public static List<Benday.Demo7.Api.DomainModels.ConfigurationItem> CreateModels(
            bool createAsUnsaved = true, int numberOfRecords = 10)
        {
            var returnValues = new List<Benday.Demo7.Api.DomainModels.ConfigurationItem>();

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
            Benday.Demo7.Api.DomainModels.ConfigurationItem fromValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue), $"{nameof(fromValue)} is null.");
            }

            fromValue.Category = UnitTestUtility.GetFakeValueForString("Modified Category");
            fromValue.ConfigurationKey = UnitTestUtility.GetFakeValueForString("Modified ConfigurationKey");
            fromValue.Description = UnitTestUtility.GetFakeValueForString("Modified Description");
            fromValue.ConfigurationValue = UnitTestUtility.GetFakeValueForString("Modified ConfigurationValue");
            fromValue.Status = UnitTestUtility.GetFakeValueForString("Modified Status");
            fromValue.CreatedBy = UnitTestUtility.GetFakeValueForString("Modified CreatedBy");
            fromValue.CreatedDate = UnitTestUtility.GetFakeValueForDateTime("Modified CreatedDate");
            fromValue.LastModifiedBy = UnitTestUtility.GetFakeValueForString("Modified LastModifiedBy");
            fromValue.LastModifiedDate = UnitTestUtility.GetFakeValueForDateTime("Modified LastModifiedDate");
            fromValue.Timestamp = UnitTestUtility.GetFakeValueForByteArray("Modified Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DomainModels.ConfigurationItem> expected,
            IList<Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity> actual)
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
            Benday.Demo7.Api.DomainModels.ConfigurationItem expected,
            Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity actual)
        {
            Assert.AreEqual<string>(expected.Category, actual.Category, "Category");
            Assert.AreEqual<string>(expected.ConfigurationKey, actual.ConfigurationKey, "ConfigurationKey");
            Assert.AreEqual<string>(expected.Description, actual.Description, "Description");
            Assert.AreEqual<string>(expected.ConfigurationValue, actual.ConfigurationValue, "ConfigurationValue");
            Assert.AreEqual<int>(expected.Id, actual.Id, "Id");
            Assert.AreEqual<string>(expected.Status, actual.Status, "Status");
            Assert.AreEqual<string>(expected.CreatedBy, actual.CreatedBy, "CreatedBy");
            Assert.AreEqual<DateTime>(expected.CreatedDate, actual.CreatedDate, "CreatedDate");
            Assert.AreEqual<string>(expected.LastModifiedBy, actual.LastModifiedBy, "LastModifiedBy");
            Assert.AreEqual<DateTime>(expected.LastModifiedDate, actual.LastModifiedDate, "LastModifiedDate");
            Assert.AreEqual<byte[]>(expected.Timestamp, actual.Timestamp, "Timestamp");
        }

        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity> expected,
            IList<Benday.Demo7.Api.DomainModels.ConfigurationItem> actual)
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
            Benday.Demo7.Api.DataAccess.Entities.ConfigurationItemEntity expected,
            Benday.Demo7.Api.DomainModels.ConfigurationItem actual)
        {
            Assert.AreEqual<string>(expected.Category, actual.Category, "Category");
            Assert.AreEqual<string>(expected.ConfigurationKey, actual.ConfigurationKey, "ConfigurationKey");
            Assert.AreEqual<string>(expected.Description, actual.Description, "Description");
            Assert.AreEqual<string>(expected.ConfigurationValue, actual.ConfigurationValue, "ConfigurationValue");
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
