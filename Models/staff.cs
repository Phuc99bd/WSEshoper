namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class staff
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public staff()
        {
            //orders = new HashSet<order>();
        }

        [Key]
        public int staff_id { get; set; }

        [StringLength(50)]
        public string display_name { get; set; }

        [StringLength(10)]
        public string role { get; set; }

        [StringLength(11)]
        public string phone { get; set; }

        [StringLength(30)]
        public string email { get; set; }

        public bool? active { get; set; }

        [StringLength(30)]
        public string password { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<order> orders { get; set; }
    }
    public class ViewModel
    {
        public product product { get; set; }
        public category category { get; set; }
        public string search { get; set; }
    }
    public class Order
    {
        public order order { get; set; }
        public string search { get; set; }
    }
}
