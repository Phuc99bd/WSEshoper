namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public product()
        {
            //order_items = new HashSet<order_items>();
        }

        [Key]
        public int product_id { get; set; }

        [StringLength(100)]
        public string product_name { get; set; }

        public int? category_id { get; set; }

        public int? quantity { get; set; }

        public int? list_price { get; set; }

        public bool? status { get; set; }

        [StringLength(50)]
        public string image { get; set; }

    
        public string Description { get; set; }

        //public virtual category category { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<order_items> order_items { get; set; }
    }
}
