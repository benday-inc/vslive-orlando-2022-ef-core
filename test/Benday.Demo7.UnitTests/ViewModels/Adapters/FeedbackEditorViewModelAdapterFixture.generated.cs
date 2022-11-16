using Benday.Demo7.Api.Adapters;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using Benday.Demo7.UnitTests.Utilities;
using Benday.Demo7.WebUi.Models;
using Benday.Demo7.WebUi.Models.Adapters;

namespace Benday.Demo7.UnitTests.ViewModels.Adapters
{
    [TestClass]
    public class FeedbackAdapterFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private FeedbackEditorViewModelAdapter _systemUnderTest;
        public FeedbackEditorViewModelAdapter SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new FeedbackEditorViewModelAdapter();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void AdaptFeedbackFromViewModelsToModels()
        {
            // arrange
            var fromValues = FeedbackViewModelTestUtility.CreateEditorViewModels();
            
            var allValuesCount = fromValues.Count;
            
            var toValues = new List<Benday.Demo7.Api.DomainModels.Feedback>();
            
            // act
            SystemUnderTest.Adapt(fromValues, toValues);
            
            // assert
            Assert.AreEqual<int>(allValuesCount, toValues.Count, "Count was wrong.");
        }
        
        [TestMethod]
        public void AdaptFeedbackFromViewModelToModel()
        {
            // arrange
            var fromValue = FeedbackViewModelTestUtility.CreateEditorViewModel();
            var toValue = new Benday.Demo7.Api.DomainModels.Feedback();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            FeedbackViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
        
        [TestMethod]
        public void AdaptFeedbackFromModelToViewModel()
        {
            // arrange
            var fromValue = FeedbackTestUtility.CreateModel();
            var toValue = new Benday.Demo7.WebUi.Models.FeedbackEditorViewModel();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            FeedbackViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
    }
}