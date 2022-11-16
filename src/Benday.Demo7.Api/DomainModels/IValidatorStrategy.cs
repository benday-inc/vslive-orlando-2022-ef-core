namespace Benday.Demo7.Api.DomainModels
{
    public interface IValidatorStrategy<T>
    {
        bool IsValid(T validateThis);
    }
}
