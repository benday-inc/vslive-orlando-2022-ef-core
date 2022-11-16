using Benday.EfCore.SqlServer;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Benday.Common;

namespace Benday.Demo7.Api.DomainModels
{
    public partial class Person :
        CoreFieldsDomainModelBase
    {
        private DomainModelField<string> _FirstName = new DomainModelField<string>(default(string));
        [Display(Name = "First name")]
        [StringLength(100)]
        public string FirstName
        {
            get
            {
                return _FirstName.Value;
            }
            set
            {
                _FirstName.Value = value;
            }
        }
        
        private DomainModelField<string> _LastName = new DomainModelField<string>(default(string));
        [Display(Name = "Last name")]
        [StringLength(100)]
        public string LastName
        {
            get
            {
                return _LastName.Value;
            }
            set
            {
                _LastName.Value = value;
            }
        }
        
        private DomainModelField<string> _EmailAddress = new DomainModelField<string>(default(string));
        [Display(Name = "Email address")]
        [StringLength(100)]
        public string EmailAddress
        {
            get
            {
                return _EmailAddress.Value;
            }
            set
            {
                _EmailAddress.Value = value;
            }
        }
        
        
        
        
        public override bool HasChanges()
        {
            if (base.HasChanges() == true)
            {
                return true;
            }
            
            if (_FirstName.HasChanges() == true)
            {
                return true;
            }
            
            if (_LastName.HasChanges() == true)
            {
                return true;
            }
            
            if (_EmailAddress.HasChanges() == true)
            {
                return true;
            }
            
            
            
            return false;
        }
        
        public override void AcceptChanges()
        {
            base.AcceptChanges();
            
            _FirstName.AcceptChanges();
            
            _LastName.AcceptChanges();
            
            _EmailAddress.AcceptChanges();
        }
        
        public override void UndoChanges()
        {
            base.UndoChanges();
            
            _FirstName.UndoChanges();
            
            _LastName.UndoChanges();
            
            _EmailAddress.UndoChanges();
        }
    }
}