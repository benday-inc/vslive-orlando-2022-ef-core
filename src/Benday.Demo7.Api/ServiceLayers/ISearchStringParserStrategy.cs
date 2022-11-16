namespace Benday.Demo7.Api.ServiceLayers
{
    public interface ISearchStringParserStrategy
    {
        string[] Parse(string parseThis);
    }
}
