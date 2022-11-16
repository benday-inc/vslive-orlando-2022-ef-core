using Microsoft.Extensions.Logging;

namespace Benday.Demo7.Api.Logging
{
    public class SqlDatabaseLoggerOptions
    {
        public LogLevel LogLevel { get; set; }
        public string ConnectionString { get; set; }
    }
}
