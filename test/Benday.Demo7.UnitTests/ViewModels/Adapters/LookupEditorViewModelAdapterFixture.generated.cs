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
    public class LookupAdapterFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private LookupEditorViewModelAdapter _systemUnderTest;
        public LookupEditorViewModelAdapter SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new LookupEditorViewModelAdapter();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void AdaptLookupFromViewModelsToModels()
        {
            // arrange
            var fromValues = LookupViewModelTestUtility.CreateEditorViewModels();
            
            var allValuesCount = fromValues.Count;
            
            var toValues = new List<Benday.Demo7.Api.DomainModels.Lookup>();
            
            // act
            SystemUnderTest.Adapt(fromValues, toValues);
            
            // assert
            Assert.AreEqual<int>(allValuesCount, toValues.Count, "Count was wrong.");
        }
        
        [TestMethod]
        public void AdaptLookupFromViewModelToModel()
        {
            // arrange
            var fromValue = LookupViewModelTestUtility.CreateEditorViewModel();
            var toValue = new Benday.Demo7.Api.DomainModels.Lookup();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            LookupViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
        
        [TestMethod]
        public void AdaptLookupFromModelToViewModel()
        {
            // arrange
            var fromValue = LookupTestUtility.CreateModel();
            var toValue = new Benday.Demo7.WebUi.Models.LookupEditorViewModel();
            
            // act
            SystemUnderTest.Adapt(fromValue, toValue);
            
            // assert
            LookupViewModelTestUtility.AssertAreEqual(fromValue, toValue);
        }
    }
}