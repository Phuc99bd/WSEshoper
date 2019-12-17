namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class order_items
    {
        public int? order_id { get; set; }

        [Key]
        public int item_id { get; set; }

        public int? product_id { get; set; }

        public int? quantity { get; set; }

        public int? list_price { get; set; }

        //public virtual order order { get; set; }

        //public virtual product product { get; set; }
    }
}
