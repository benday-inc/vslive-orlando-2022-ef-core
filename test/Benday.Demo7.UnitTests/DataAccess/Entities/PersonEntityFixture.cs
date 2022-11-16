using Benday.Demo7.Api.DataAccess.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.DataAccess.Entities
{
    [TestClass]
    public class PersonEntityFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }

        private PersonEntity _systemUnderTest;
        public PersonEntity SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new PersonEntity();
                }

                return _systemUnderTest;
            }
        }
    }
}
