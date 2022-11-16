using Benday.Demo7.Api.DomainModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api;
using Benday.Demo7.Api.Adapters;
using Benday.Demo7.WebUi.Models;

namespace Benday.Demo7.WebUi.Models.Adapters
{
    public partial class LogEntryEditorViewModelAdapter :
        AdapterBase<
        Benday.Demo7.Api.DomainModels.LogEntry,
        Benday.Demo7.WebUi.Models.LogEntryEditorViewModel>
    {
        protected override void PerformAdapt(
            Benday.Demo7.Api.DomainModels.LogEntry fromValue,
            Benday.Demo7.WebUi.Models.LogEntryEditorViewModel toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Id = fromValue.Id;
            toValue.Category = fromValue.Category;
            toValue.LogLevel = fromValue.LogLevel;
            toValue.LogText = fromValue.LogText;
            toValue.ExceptionText = fromValue.ExceptionText;
            toValue.EventId = fromValue.EventId;
            toValue.State = fromValue.State;
            toValue.LogDate = fromValue.LogDate;
            
            
        }
        
        protected override AdapterActions BeforeAdapt(
            Benday.Demo7.WebUi.Models.LogEntryEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.LogEntry toValue)
        {
            if (fromValue == null)
            {
                return AdapterActions.Skip;
            }
            else if (fromValue.Id != ApiConstants.UnsavedId && fromValue.IsMarkedForDelete == true)
            {
                return AdapterActions.Delete;
            }
            else
            {
                return AdapterActions.Adapt;
            }
        }
        
        protected override void PerformAdapt(
            Benday.Demo7.WebUi.Models.LogEntryEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.LogEntry toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Id = fromValue.Id;
            toValue.Category = fromValue.Category;
            toValue.LogLevel = fromValue.LogLevel;
            toValue.LogText = fromValue.LogText;
            toValue.ExceptionText = fromValue.ExceptionText;
            toValue.EventId = fromValue.EventId;
            toValue.State = fromValue.State;
            toValue.LogDate = fromValue.LogDate;
        }
    }
}