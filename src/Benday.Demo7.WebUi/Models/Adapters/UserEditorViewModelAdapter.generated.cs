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
    public partial class UserEditorViewModelAdapter :
        AdapterBase<
        Benday.Demo7.Api.DomainModels.User,
        Benday.Demo7.WebUi.Models.UserEditorViewModel>
    {
        protected override void PerformAdapt(
            Benday.Demo7.Api.DomainModels.User fromValue,
            Benday.Demo7.WebUi.Models.UserEditorViewModel toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Username = fromValue.Username;
            toValue.Source = fromValue.Source;
            toValue.EmailAddress = fromValue.EmailAddress;
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.PhoneNumber = fromValue.PhoneNumber;
            new UserClaimEditorViewModelAdapter().Adapt(
                fromValue.Claims,
                toValue.Claims);
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
            
            
        }
        
        protected override AdapterActions BeforeAdapt(
            Benday.Demo7.WebUi.Models.UserEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.User toValue)
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
            Benday.Demo7.WebUi.Models.UserEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.User toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.Username = fromValue.Username;
            toValue.Source = fromValue.Source;
            toValue.EmailAddress = fromValue.EmailAddress;
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.PhoneNumber = fromValue.PhoneNumber;
            new UserClaimEditorViewModelAdapter().Adapt(
                fromValue.Claims,
                toValue.Claims);
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