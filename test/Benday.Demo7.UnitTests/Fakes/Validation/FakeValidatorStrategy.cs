using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.UnitTests.Fakes.Validation
{
    public class FakeValidatorStrategy<T> : IValidatorStrategy<T>
    {
        public bool IsValidReturnValue { get; set; }

        public bool IsValid(T validateThis)
        {
            return IsValidReturnValue;
        }
    }
}
