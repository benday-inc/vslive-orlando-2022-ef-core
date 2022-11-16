using System;
using Microsoft.Extensions.Logging;

namespace Benday.Demo7.UnitTests.Fakes
{
    public class FakeLogger<T> : ILogger<T>, IDisposable
    {
        public IDisposable BeginScope<TState>(TState state)
        {
            return this;
        }

        public void Dispose()
        {
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(
            LogLevel logLevel, EventId eventId, TState state,
            Exception exception, Func<TState, Exception, string> formatter)
        {
        }
    }
}
