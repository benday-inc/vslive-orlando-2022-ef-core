using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Demo7.Api;
using Benday.Demo7.UnitTests.Utilities;

namespace Benday.Demo7.UnitTests.ViewModels
{
    public static class FeedbackViewModelTestUtility
    {
        public static List<Benday.Demo7.WebUi.Models.FeedbackEditorViewModel> CreateEditorViewModels(
            bool createAsUnsaved = true)
        {
            var returnValues = new List<Benday.Demo7.WebUi.Models.FeedbackEditorViewModel>();
            
            for (int i = 0; i < 10; i++)
            {
                var temp = CreateEditorViewModel();
                
                returnValues.Add(temp);
                
                if (createAsUnsaved == false)
                {
                    temp.Id = i + 1;
                }
            }
            
            return returnValues;
        }
        
        public static Benday.Demo7.WebUi.Models.FeedbackEditorViewModel CreateEditorViewModel(
            bool createAsUnsaved = true)
        {
            var fromValue = new Benday.Demo7.WebUi.Models.FeedbackEditorViewModel
            {
                FeedbackType = UnitTestUtility.GetFakeValueForString("FeedbackType"),
                    Sentiment = UnitTestUtility.GetFakeValueForString("Sentiment"),
                    Subject = UnitTestUtility.GetFakeValueForString("Subject"),
                    FeedbackText = UnitTestUtility.GetFakeValueForString("FeedbackText"),
                    Username = UnitTestUtility.GetFakeValueForString("Username"),
                    FirstName = UnitTestUtility.GetFakeValueForString("FirstName"),
                    LastName = UnitTestUtility.GetFakeValueForString("LastName"),
                    Referer = UnitTestUtility.GetFakeValueForString("Referer"),
                    UserAgent = UnitTestUtility.GetFakeValueForString("UserAgent"),
                    IpAddress = UnitTestUtility.GetFakeValueForString("IpAddress"),
                    IsContactRequest = true,
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
                fromValue.CreatedDate = default(DateTime);
                fromValue.LastModifiedDate = default(DateTime);
                fromValue.CreatedBy = null;
                fromValue.LastModifiedBy = null;
            }
            
            return fromValue;
        }
        
        public static void AssertAreEqual(
            IList<Benday.Demo7.Api.DomainModels.Feedback> expected,
            IList<Benday.Demo7.WebUi.Models.FeedbackEditorViewModel> actual)
        {
            Assert.IsNotNull(expected, "Expected was null.");
            Assert.IsNotNull(actual, "Actual was null.");
            Assert.AreEqual<int>(expected.Count, actual.Count, "Item count should match.");
            
            for (int i = 0; i < expected.Count; i++)
            {
                AssertAreEqual(expected[i], actual[i]);
            }
        }
        
        public static void AssertAreEqual(
            Benday.Demo7.Api.DomainModels.Feedback expected,
            Benday.Demo7.WebUi.Models.FeedbackEditorViewModel actual)
        {
            Assert.AreEqual<string>(expected.FeedbackType, actual.FeedbackType, "FeedbackType");
            Assert.AreEqual<string>(expected.Sentiment, actual.Sentiment, "Sentiment");
            Assert.AreEqual<string>(expected.Subject, actual.Subject, "Subject");
            Assert.AreEqual<string>(expected.FeedbackText, actual.FeedbackText, "FeedbackText");
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.FirstName, actual.FirstName, "FirstName");
            Assert.AreEqual<string>(expected.LastName, actual.LastName, "LastName");
            Assert.AreEqual<string>(expected.Referer, actual.Referer, "Referer");
            Assert.AreEqual<string>(expected.UserAgent, actual.UserAgent, "UserAgent");
            Assert.AreEqual<string>(expected.IpAddress, actual.IpAddress, "IpAddress");
            Assert.AreEqual<bool>(expected.IsContactRequest, actual.IsContactRequest, "IsContactRequest");
            Assert.AreEqual<int>(expected.Id, actual.Id, "Id");
            Assert.AreEqual<string>(expected.Status, actual.Status, "Status");
            Assert.AreEqual<string>(expected.CreatedBy, actual.CreatedBy, "CreatedBy");
            Assert.AreEqual<DateTime>(expected.CreatedDate, actual.CreatedDate, "CreatedDate");
            Assert.AreEqual<string>(expected.LastModifiedBy, actual.LastModifiedBy, "LastModifiedBy");
            Assert.AreEqual<DateTime>(expected.LastModifiedDate, actual.LastModifiedDate, "LastModifiedDate");
            Assert.AreEqual<byte[]>(expected.Timestamp, actual.Timestamp, "Timestamp");
        }
        
        public static void AssertAreEqual(
            IList<Benday.Demo7.WebUi.Models.FeedbackEditorViewModel> expected,
            IList<Benday.Demo7.Api.DomainModels.Feedback> actual)
        {
            Assert.IsNotNull(expected, "Expected was null.");
            Assert.IsNotNull(actual, "Actual was null.");
            Assert.AreEqual<int>(expected.Count, actual.Count,
                "{0}.AssertAreEqual(): Item count should match.",
                nameof(FeedbackViewModelTestUtility));
            
            for (int i = 0; i < expected.Count; i++)
            {
                AssertAreEqual(expected[i], actual[i]);
            }
        }
        
        public static void AssertAreNotEqual(
            Benday.Demo7.WebUi.Models.FeedbackEditorViewModel expected,
            Benday.Demo7.Api.DomainModels.Feedback actual)
        {
            Assert.AreNotEqual<int>(expected.Id, actual.Id,
                "{0}.AssertAreNotEqual(): Id should not match.",
                nameof(FeedbackViewModelTestUtility));
        }
        
        public static void AssertAreEqual(
            Benday.Demo7.WebUi.Models.FeedbackEditorViewModel expected,
            Benday.Demo7.Api.DomainModels.Feedback actual)
        {
            Assert.AreEqual<string>(expected.FeedbackType, actual.FeedbackType, "FeedbackType");
            Assert.AreEqual<string>(expected.Sentiment, actual.Sentiment, "Sentiment");
            Assert.AreEqual<string>(expected.Subject, actual.Subject, "Subject");
            Assert.AreEqual<string>(expected.FeedbackText, actual.FeedbackText, "FeedbackText");
            Assert.AreEqual<string>(expected.Username, actual.Username, "Username");
            Assert.AreEqual<string>(expected.FirstName, actual.FirstName, "FirstName");
            Assert.AreEqual<string>(expected.LastName, actual.LastName, "LastName");
            Assert.AreEqual<string>(expected.Referer, actual.Referer, "Referer");
            Assert.AreEqual<string>(expected.UserAgent, actual.UserAgent, "UserAgent");
            Assert.AreEqual<string>(expected.IpAddress, actual.IpAddress, "IpAddress");
            Assert.AreEqual<bool>(expected.IsContactRequest, actual.IsContactRequest, "IsContactRequest");
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