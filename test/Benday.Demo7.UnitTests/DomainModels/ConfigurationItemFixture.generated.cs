using Benday.Demo7.Api.DomainModels;
using Benday.Demo7.UnitTests.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Benday.Demo7.UnitTests.DomainModels
{
    [TestClass]
    public partial class ConfigurationItemFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private ConfigurationItem _systemUnderTest;
        public ConfigurationItem SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new ConfigurationItem();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void ConfigurationItem_VerifyDomainModelBaseOperations()
        {
            var instance = ConfigurationItemTestUtility.CreateModel(false);
            
            instance.AcceptChanges();
            
            var tester = new DomainModelFieldTester<ConfigurationItem>(instance);
            
            tester.RunChangeTrackingTestsForValueTypeProperties();
        }
    }
}