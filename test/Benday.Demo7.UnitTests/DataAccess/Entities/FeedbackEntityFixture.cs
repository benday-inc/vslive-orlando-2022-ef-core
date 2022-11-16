using Benday.Demo7.Api.DataAccess.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Benday.Demo7.UnitTests.DataAccess.Entities
{
    [TestClass]
    public class FeedbackEntityFixture
    {
        [TestInitialize]
        public void OnTestInitialize()
        {
            _systemUnderTest = null;
        }

        private FeedbackEntity _systemUnderTest;
        public FeedbackEntity SystemUnderTest
        {
            get
            {
                if (_systemUnderTest == null)
                {
                    _systemUnderTest = new FeedbackEntity();
                }

                return _systemUnderTest;
            }
        }
    }
}
