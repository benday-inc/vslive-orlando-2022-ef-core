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
    public class ConfigurationItemAdapterFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private ConfigurationItemEditorViewModelAdapter _systemUnderTest;
        public ConfigurationItemEditorViewModelAdapter SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new ConfigurationItemEditorViewModelAdapter();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void AdaptConfigurationItemFromViewModelsToModels()
        {
            // arrange
            var fromValues = ConfigurationItemViewModelTestUtility.CreateEditorViewModels();
            
            var allValuesCount = fromValues.Count;
            
            var toValues = new List<Benday.Demo7.Api.DomainModels.ConfigurationItem>();
            
            // act
            SystemUnderTest.Adapt(fromValues, toValues);
            
            // assert
            Assert.AreEqual<int>(allValuesCount, toValues.Count, "Count was wrong.");
        }
        
        [TestMethod]
        public void AdaptConfigurationItemFromViewModelToModel()
        {
            // arrange
            var fromValue = ConfigurationItemViewModelTestUtility.CreateEditorViewModel();
            var toValue = new Benday.Demo7.Api.DomainModels.ConfigurationItem();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            ConfigurationItemViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
        
        [TestMethod]
        public void AdaptConfigurationItemFromModelToViewModel()
        {
            // arrange
            var fromValue = ConfigurationItemTestUtility.CreateModel();
            var toValue = new Benday.Demo7.WebUi.Models.ConfigurationItemEditorViewModel();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            ConfigurationItemViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
    }
}