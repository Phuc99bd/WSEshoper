namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public customer()
        {
            //commentOfProducts = new HashSet<commentOfProduct>();
            //orders = new HashSet<order>();
        }

        [Key]
        public int customer_id { get; set; }

        [StringLength(50)]
        public string first_name { get; set; }

        [StringLength(50)]
        public string last_name { get; set; }

        [StringLength(11)]
        public string phone { get; set; }

        [StringLength(30)]
        public string email { get; set; }

        [StringLength(60)]
        public string street { get; set; }

        [StringLength(20)]
        public string typeLogin { get; set; }

        [StringLength(20)]
        public string city { get; set; }

        public bool? states { get; set; }

        [StringLength(20)]
        public string zip_code { get; set; }

        [StringLength(50)]
        public string password { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<commentOfProduct> commentOfProducts { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<order> orders { get; set; }
    }
}
