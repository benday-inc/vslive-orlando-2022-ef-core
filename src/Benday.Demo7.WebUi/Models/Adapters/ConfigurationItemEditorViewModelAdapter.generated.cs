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
    public partial class ConfigurationItemEditorViewModelAdapter :
        AdapterBase<
        Benday.Demo7.Api.DomainModels.ConfigurationItem,
        Benday.Demo7.WebUi.Models.ConfigurationItemEditorViewModel>
    {
        protected override void PerformAdapt(
            Benday.Demo7.Api.DomainModels.ConfigurationItem fromValue,
            Benday.Demo7.WebUi.Models.ConfigurationItemEditorViewModel toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Category = fromValue.Category;
            toValue.ConfigurationKey = fromValue.ConfigurationKey;
            toValue.Description = fromValue.Description;
            toValue.ConfigurationValue = fromValue.ConfigurationValue;
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
            
            
        }
        
        protected override AdapterActions BeforeAdapt(
            Benday.Demo7.WebUi.Models.ConfigurationItemEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.ConfigurationItem toValue)
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
            Benday.Demo7.WebUi.Models.ConfigurationItemEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.ConfigurationItem toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Category = fromValue.Category;
            toValue.ConfigurationKey = fromValue.ConfigurationKey;
            toValue.Description = fromValue.Description;
            toValue.ConfigurationValue = fromValue.ConfigurationValue;
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
        }
    }
}