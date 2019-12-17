namespace WSCamera.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("commentOfProduct")]
    public partial class commentOfProduct
    {
        [Key]
        public int comment_id { get; set; }

        public int? product_id { get; set; }

        public string content { get; set; }

        public DateTime? createdAt { get; set; }

        public string name { get; set; }

        public string email { get; set; }
        //public virtual customer customer { get; set; }
    }
}
