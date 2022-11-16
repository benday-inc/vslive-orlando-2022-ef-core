using Benday.Demo7.Api.DomainModels;
using Benday.Demo7.UnitTests.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Benday.Demo7.UnitTests.DomainModels
{
    [TestClass]
    public partial class LogEntryFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private LogEntry _systemUnderTest;
        public LogEntry SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new LogEntry();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void LogEntry_VerifyDomainModelBaseOperations()
        {
            var instance = LogEntryTestUtility.CreateModel(false);
            
            instance.AcceptChanges();
            
            var tester = new DomainModelFieldTester<LogEntry>(instance);
            
            tester.RunChangeTrackingTestsForValueTypeProperties();
        }
    }
}