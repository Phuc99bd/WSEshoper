using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using WSCamera.Helper;
namespace WSCamera.Controllers
{
    public class CheckoutController : Controller
    {
        Camera db = new Camera();
        // GET: Checkout
        public ActionResult Index()
        {
            if(Session["user"] == null)
            {
                TempData["error2"] = "Bạn cần đăng nhập trước khi thanh toán";
                return RedirectToAction("Login", "Account");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Index(customer customer)
        {
            if (Session["user"] == null)
            {
                TempData["error2"] = "Bạn cần đăng nhập trước khi Order !.";
                return RedirectToAction("Login", "Account");
            }

            if (Session["Cart"] == null)
            {
                ViewBag.error = "Giỏ hàng của bạn đang trống !";
                return Index();
            }
            if (ModelState.IsValid)
            {

                order order = new order
                {
                    customer_id = ((Session["user"] as customer).customer_id),
                    first_name = customer.first_name,
                    last_name = customer.last_name,
                    email = customer.email,
                    //staff_id = 6,
                    phone = customer.phone,
                    street = customer.street,
                    city = customer.city,
                    zip_code = customer.zip_code,
                    order_status = false,
                    order_date = DateTime.Now,
                    shipped_date = DateTime.Now.AddDays(4)
                };
                db.orders.Add(order);
                db.SaveChanges();
                List<CartItem> cart = (List<CartItem>)Session["Cart"];
                Xmail.XMail.Send(order.email, 1, 0, order, cart);
                List<staff> staff = db.staffs.ToList();
                foreach (var item in staff)
                {
                    Xmail.XMail.Send(item.email, 0, 0, order, cart);
                }
                ViewBag.success = "Đặt hàng thành công!";

                for (int i = 0; i < cart.Count; i++)
                {
                    order_items item = new order_items
                    {
                        order_id = order.order_id,
                        product_id = cart[i].cart.product_id,
                        quantity = cart[i].quantity,
                        list_price = cart[i].cart.list_price
                    };
                    product product = db.products.Find(cart[i].cart.product_id);
                    product.quantity = product.quantity - cart[i].quantity;
                    db.order_items.Add(item);
                    db.SaveChanges();
                }
                Session.Remove("Cart");
                return Index();


            }
            else
            {
                return Index();
            }
        }
    }
}