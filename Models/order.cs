namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public order()
        {
            //order_items = new HashSet<order_items>();
        }

        [Key]
        public int order_id { get; set; }

        public int? customer_id { get; set; }

        public bool? order_status { get; set; }

        [Column(TypeName = "date")]
        public DateTime? order_date { get; set; }

        [Column(TypeName = "date")]
        public DateTime? shipped_date { get; set; }

        public int? staff_id { get; set; }

        [StringLength(50)]
        public string email { get; set; }

        [StringLength(50)]
        public string phone { get; set; }

        [StringLength(200)]
        public string street { get; set; }

        [StringLength(50)]
        public string first_name { get; set; }

        [StringLength(50)]
        public string last_name { get; set; }

        [StringLength(50)]
        public string zip_code { get; set; }

        [StringLength(50)]
        public string city { get; set; }

        //public virtual customer customer { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<order_items> order_items { get; set; }

        //public virtual staff staff { get; set; }
    }
}
