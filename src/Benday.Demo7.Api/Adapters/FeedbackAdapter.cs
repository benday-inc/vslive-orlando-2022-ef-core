using System;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.Api.Adapters
{
    public partial class FeedbackAdapter :
        AdapterBase<Feedback, FeedbackEntity>
    {
        protected override void PerformAdapt(
            Feedback fromValue,
            FeedbackEntity toValue)
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            Feedback fromValue,
            FeedbackEntity toValue, bool onlyScalarProperties)
        {
            if (fromValue == null)
            {
                throw new ArgumentNullException(nameof(fromValue));
            }

            if (toValue == null)
            {
                throw new ArgumentNullException(nameof(toValue));
            }
            toValue.FeedbackType = fromValue.FeedbackType;
            toValue.Sentiment = fromValue.Sentiment;
            toValue.Subject = fromValue.Subject;
            toValue.FeedbackText = fromValue.FeedbackText;
            toValue.Username = fromValue.Username;
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.Referer = fromValue.Referer;
            toValue.UserAgent = fromValue.UserAgent;
            toValue.IpAddress = fromValue.IpAddress;
            toValue.IsContactRequest = fromValue.IsContactRequest;
            toValue.Id = fromValue.Id;
            toValue.Status = fromValue.Status;
            toValue.CreatedBy = fromValue.CreatedBy;
            toValue.CreatedDate = fromValue.CreatedDate;
            toValue.LastModifiedBy = fromValue.LastModifiedBy;
            toValue.LastModifiedDate = fromValue.LastModifiedDate;
            toValue.Timestamp = fromValue.Timestamp;
        }

        protected override void PerformAdapt(
            FeedbackEntity fromValue,
            Feedback toValue
            )
        {
            PerformAdapt(fromValue, toValue, false);
        }

        protected override void PerformAdapt(
            FeedbackEntity fromValue,
            Feedback toValue, bool onlyScalarProperties
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

            toValue.FeedbackType = fromValue.FeedbackType;
            toValue.Sentiment = fromValue.Sentiment;
            toValue.Subject = fromValue.Subject;
            toValue.FeedbackText = fromValue.FeedbackText;
            toValue.Username = fromValue.Username;
            toValue.FirstName = fromValue.FirstName;
            toValue.LastName = fromValue.LastName;
            toValue.Referer = fromValue.Referer;
            toValue.UserAgent = fromValue.UserAgent;
            toValue.IpAddress = fromValue.IpAddress;
            toValue.IsContactRequest = fromValue.IsContactRequest;
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
