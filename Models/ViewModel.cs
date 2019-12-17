using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PagedList;
namespace WSCamera.Models
{
    public class ViewHome
    {
        public List<category> category { get; set; }
        public List<product> product { get; set; }
        public List<product> product2 { get; set; }
    }
    public class viewSingleProduct
    {
        public product details { get; set; }
        public List<category> category { get; set; }
        public List<product> productLQ { get; set; }
        public List<product> productList { get; set; }
        public List<commentOfProduct> comment { get; set; }
    }
 

    public class productDs{
        public product product { get; set; }
        }

    public class CartItem
    {
        public product cart { get; set; }
        public int quantity { get; set; }
    }
    public class supportContact
    {
        public string username { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string content { get; set; }
    }
    public class OrderItem
    {
        public order_items item { get; set; }
        public product product { get; set; }
    }
    public class OrderInterface
    {
        public List<order> order { get; set; }
        public List<order_items> item { get; set; }
    }
    public class OrderItemInterFace
    {
        public order order { get; set; }
        public IEnumerable<OrderItem> item { get; set; }

    }
}