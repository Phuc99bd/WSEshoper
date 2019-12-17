using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;

namespace WSCamera.Controllers
{
    public class ViewDetailController : Controller
    {
        Camera db = new Camera();
        // GET: ViewDetail
        public ActionResult Index(int id = 1)
        {
            if (Session["user"] != null)
            {
                order order = db.orders.Find(id);
                List<order_items> item = db.order_items.Where(x => x.order_id == id).ToList();
                List<product> product = db.products.ToList();
                var items = from e in item
                            join f in product on e.product_id equals f.product_id
                            select new OrderItem
                            {
                                item = e,
                                product = f
                            };
                var model = new OrderItemInterFace
                {
                    order = order,
                    item = items
                };
                return View(model);
            }
            return RedirectToAction("Login", "Account");
        }
    }
}