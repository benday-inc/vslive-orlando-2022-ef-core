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
    public partial class PersonEditorViewModelAdapter :
        AdapterBase<
        Benday.Demo7.Api.DomainModels.Person,
        Benday.Demo7.WebUi.Models.PersonEditorViewModel>
    {
        protected override void PerformAdapt(
            Benday.Demo7.Api.DomainModels.Person fromValue,
            Benday.Demo7.WebUi.Models.PersonEditorViewModel toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.EmailAddress = fromValue.EmailAddress;
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
            
            
        }
        
        protected override AdapterActions BeforeAdapt(
            Benday.Demo7.WebUi.Models.PersonEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.Person toValue)
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
            Benday.Demo7.WebUi.Models.PersonEditorViewModel fromValue,
            Benday.Demo7.Api.DomainModels.Person toValue)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }
            
            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.EmailAddress = fromValue.EmailAddress;
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