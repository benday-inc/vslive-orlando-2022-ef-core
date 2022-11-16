using System.Collections.Generic;
using Benday.Demo7.Api.DomainModels;

namespace Benday.Demo7.Api
{
    public interface IAttributedDomainModel
    {
        List<DomainModelBase> GetAttributes();
        string GetAttributeValue(string key);
        void SetAttributeValue(
            string key, string value,
            string status = ApiConstants.DefaultAttributeStatus);
    }
}
