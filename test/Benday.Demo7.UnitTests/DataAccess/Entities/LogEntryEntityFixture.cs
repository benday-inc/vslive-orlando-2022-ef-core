using Benday.Demo7.Api.DataAccess.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.DataAccess.Entities
{
    [TestClass]
    public class LogEntryEntityFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }

        private LogEntryEntity _systemUnderTest;
        public LogEntryEntity SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new LogEntryEntity();
                }

                return _systemUnderTest;
            }
        }
    }
}
