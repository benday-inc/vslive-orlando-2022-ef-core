using System;
using System.Collections.Generic;
using System.Security.Claims;
using Benday.Demo7.WebUi.Security;

namespace Benday.Demo7.UnitTests.Security
{
    public class MockUserClaimsPrincipalProvider : IUserClaimsPrincipalProvider
    {
        public MockUserClaimsPrincipalProvider()
        {
            InitializeReturnValue();
        }

        public ClaimsPrincipal ReturnValue { get; private set; }

        public ClaimsPrincipal GetUser()
        {
            return ReturnValue;
        }

        private List<Claim> _claims;
        private List<Claim> Claims
        {
            get
            {
                if (_claims == null)
                {
                    _claims = new List<Claim>();
                }

                return _claims;
            }
        }

        public void AddClaim(string claimType, string claimValue)
        {
            Claims.Add(new Claim(claimType, claimValue));

            InitializeReturnValue();
        }

        private void InitializeReturnValue()
        {
            var identity = new ClaimsIdentity(Claims);

            ReturnValue = new ClaimsPrincipal(identity);
        }

        internal void AddClaim(object claimsType)
        {
            throw new NotImplementedException();
        }
    }
}
