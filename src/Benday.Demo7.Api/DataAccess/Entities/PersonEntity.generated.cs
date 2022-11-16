using Benday.EfCore.SqlServer;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Benday.Common;

namespace Benday.Demo7.Api.DataAccess.Entities
{
    [Table("Person", Schema = "dbo")]
    public partial class PersonEntity : CoreFieldsEntityBase
    {
        [Column(Order = 0)]
        [StringLength(100)]
        [Required]
        public string FirstName { get; set; }
        
        [Column(Order = 1)]
        [StringLength(100)]
        [Required]
        public string LastName { get; set; }
        
        [Column(Order = 2)]
        [StringLength(100)]
        [Required]
        public string EmailAddress { get; set; }
    }
}