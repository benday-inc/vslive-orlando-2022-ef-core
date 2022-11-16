using Benday.Demo7.Api.DataAccess.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.DataAccess.Entities
{
    [TestClass]
    public class LookupEntityFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }

        private LookupEntity _systemUnderTest;
        public LookupEntity SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new LookupEntity();
                }

                return _systemUnderTest;
            }
        }
    }
}
