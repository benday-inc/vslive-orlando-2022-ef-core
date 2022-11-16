using Benday.EfCore.SqlServer;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using Benday.Common;
using Benday.Demo7.Api;

namespace Benday.Demo7.WebUi.Models
{
    public partial class PersonEditorViewModel : IInt32Identity, ISelectable, IDeleteable
    {
        public bool IsSelected { get; set; }
        public bool IsMarkedForDelete { get; set; }
        
        [Display(Name = "First name")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string FirstName { get; set; }
        
        [Display(Name = "Last name")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string LastName { get; set; }
        
        [Display(Name = "Email address")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string EmailAddress { get; set; }
        
        [Display(Name = "Id")]
        public int Id { get; set; }
        
        [Display(Name = "Status")]
        [DisplayFormat(ConvertEmptyStringToNull = true)]
        [Required]
        public string Status { get; set; } = ApiConstants.StatusActive;
        private List<SelectListItem> _Statuses;
        public List<SelectListItem> Statuses
        {
            get
            {
                if (_Statuses == null)
                {
                    _Statuses = new List<SelectListItem>();
                }
                
                return _Statuses;
            }
            set
            {
                _Statuses = value;
            }
        }
        
        [Display(Name = "Created By")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string CreatedBy { get; set; }
        
        [Display(Name = "Created Date")]
        [DisplayFormat(ApplyFormatInEditMode=true, DataFormatString = "{0:d}")]
        public DateTime CreatedDate { get; set; }
        
        [Display(Name = "Last Modified By")]
        [DisplayFormat(ConvertEmptyStringToNull = false)]
        public string LastModifiedBy { get; set; }
        
        [Display(Name = "Last Modified Date")]
        [DisplayFormat(ApplyFormatInEditMode=true, DataFormatString = "{0:d}")]
        public DateTime LastModifiedDate { get; set; }
        
        [Display(Name = "Timestamp")]
        public byte[] Timestamp { get; set; }
    }
}