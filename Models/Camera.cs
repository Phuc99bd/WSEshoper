namespace WSCamera.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Camera : DbContext
    {
        public Camera()
            : base("name=Camera")
        {
        }

        public virtual DbSet<category> categories { get; set; }
        public virtual DbSet<commentOfProduct> commentOfProducts { get; set; }
        public virtual DbSet<customer> customers { get; set; }
        public virtual DbSet<order_items> order_items { get; set; }
        public virtual DbSet<order> orders { get; set; }
        public virtual DbSet<product> products { get; set; }
        public virtual DbSet<staff> staffs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<order>()
                .Property(e => e.street)
                .IsFixedLength();
        }
    }
}
