using Benday.Demo7.Api.Security;

namespace Benday.Demo7.UnitTests
{
    public class FakeRouteDataAccessor : IRouteDataAccessor
    {
        public bool WasGetIdCalled { get; set; }
        public string GetIdReturnValue { get; set; }

        public string GetId()
        {
            WasGetIdCalled = true;
            return GetIdReturnValue;
        }
    }
}
