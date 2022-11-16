using System;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.Api.Adapters
{
    public partial class UserClaimAdapter :
        AdapterBase<UserClaim, UserClaimEntity>
    {
        protected override void PerformAdapt(
            UserClaim fromValue,
            UserClaimEntity toValue)
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            UserClaim fromValue,
            UserClaimEntity toValue, bool onlyScalarProperties)
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

        protected override void PerformAdapt(
            UserClaimEntity fromValue,
            UserClaim toValue
            )
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            UserClaimEntity fromValue,
            UserClaim toValue, bool onlyScalarProperties
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
            toValue.ClaimName = fromValue.ClaimName;
            toValue.ClaimValue = fromValue.ClaimValue;
            toValue.UserId = fromValue.UserId;
            if (fromValue.User != null)
            {
                var adapter = new UserAdapter();

                User toChildValue;

                if (toValue.User == null)
                {
                    toChildValue = new User();
                }
                else
                {
                    toChildValue = toValue.User;
                }

                adapter.Adapt(fromValue.User, toChildValue, true);

                toValue.User = toChildValue;
            }
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


            toValue.AcceptChanges();
        }
    }
}
