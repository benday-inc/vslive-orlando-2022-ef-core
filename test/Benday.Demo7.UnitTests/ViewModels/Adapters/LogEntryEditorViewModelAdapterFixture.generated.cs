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
    public class LogEntryAdapterFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private LogEntryEditorViewModelAdapter _systemUnderTest;
        public LogEntryEditorViewModelAdapter SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new LogEntryEditorViewModelAdapter();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void AdaptLogEntryFromViewModelsToModels()
        {
            // arrange
            var fromValues = LogEntryViewModelTestUtility.CreateEditorViewModels();
            
            var allValuesCount = fromValues.Count;
            
            var toValues = new List<Benday.Demo7.Api.DomainModels.LogEntry>();
            
            // act
            SystemUnderTest.Adapt(fromValues, toValues);
            
            // assert
            Assert.AreEqual<int>(allValuesCount, toValues.Count, "Count was wrong.");
        }
        
        [TestMethod]
        public void AdaptLogEntryFromViewModelToModel()
        {
            // arrange
            var fromValue = LogEntryViewModelTestUtility.CreateEditorViewModel();
            var toValue = new Benday.Demo7.Api.DomainModels.LogEntry();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            LogEntryViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
        
        [TestMethod]
        public void AdaptLogEntryFromModelToViewModel()
        {
            // arrange
            var fromValue = LogEntryTestUtility.CreateModel();
            var toValue = new Benday.Demo7.WebUi.Models.LogEntryEditorViewModel();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            LogEntryViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
    }
}