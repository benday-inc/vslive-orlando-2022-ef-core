using System;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.Api.Adapters
{
    public partial class UserAdapter :
        AdapterBase<User, UserEntity>
    {
        protected override void PerformAdapt(
            User fromValue,
            UserEntity toValue)
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            User fromValue,
            UserEntity toValue, bool onlyScalarProperties)
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
            if (onlyScalarProperties == false)
            {
                new UserClaimAdapter().Adapt(
                    fromValue.Claims,
                    toValue.Claims);
            }
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
        }

        protected override void PerformAdapt(
            UserEntity fromValue,
            User toValue
            )
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            UserEntity fromValue,
            User toValue, bool onlyScalarProperties
            )
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
            if (onlyScalarProperties == false)
            {
                new UserClaimAdapter().Adapt(
                    fromValue.Claims,
                    toValue.Claims);
            }
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;


            toValue.AcceptChanges();
        }
    }
}
