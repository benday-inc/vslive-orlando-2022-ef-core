using Benday.Demo7.Api.DomainModels;
using Benday.Demo7.UnitTests.Utilities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;

namespace Benday.Demo7.UnitTests.DomainModels
{
    [TestClass]
    public partial class UserFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }
        
        private User _systemUnderTest;
        public User SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new User();
                }
                
                return _systemUnderTest;
            }
        }
        
        [TestMethod]
        public void User_VerifyDomainModelBaseOperations()
        {
            var instance = UserTestUtility.CreateModel(false);
            
            instance.AcceptChanges();
            
            var tester = new DomainModelFieldTester<User>(instance);
            
            tester.RunChangeTrackingTestsForValueTypeProperties();
        }
    }
}