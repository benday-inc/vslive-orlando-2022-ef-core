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
    public partial class UserClaimEditorViewModelAdapter :
        AdapterBase<
        Benday.Demo7.Api.DomainModels.UserClaim,
        Benday.Demo7.WebUi.Models.UserClaimEditorViewModel>
    {
        protected override void PerformAdapt(
            Benday.Demo7.Api.DomainModels.UserClaim fromValue,
            Benday.Demo7.WebUi.Models.UserClaimEditorViewModel toValue)
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
            toValue.ClaimName = fromValue.ClaimName;
            toValue.ClaimValue = fromValue.ClaimValue;
            toValue.UserId = fromValue.UserId;
            toValue.ClaimLogicType = fromValue.ClaimLogicType;
            toValue.StartDate = fromValue.StartDate;
            toValue.EndDate = fromValue.EndDate;
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
            
            
        }
        
        protected override AdapterActions BeforeAdapt(
            Benday.Demo7.WebUi.Models.UserClaimEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.UserClaim toValue)
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
            Benday.Demo7.WebUi.Models.UserClaimEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.UserClaim toValue)
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
            toValue.ClaimName = fromValue.ClaimName;
            toValue.ClaimValue = fromValue.ClaimValue;
            toValue.UserId = fromValue.UserId;
            toValue.ClaimLogicType = fromValue.ClaimLogicType;
            toValue.StartDate = fromValue.StartDate;
            toValue.EndDate = fromValue.EndDate;
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