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
    [Table("Lookup", Schema = "dbo")]
    public partial class LookupEntity : CoreFieldsEntityBase
    {
        [Column(Order = 0)]
        [Required]
        public int DisplayOrder { get; set; }
        
        [Column(Order = 1)]
        [StringLength(50)]
        [Required]
        public string LookupType { get; set; }
        
        [Column(Order = 2)]
        [StringLength(50)]
        [Required]
        public string LookupKey { get; set; }
        
        [Column(Order = 3)]
        [StringLength(50)]
        [Required]
        public string LookupValue { get; set; }
    }
}