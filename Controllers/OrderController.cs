using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;

namespace WSCamera.Controllers
{
    public class OrderController : Controller
    {
        Camera db = new Camera();
        // GET: Order
        public ActionResult Index()
        {
            if (Session["user"] != null)
            {
                int id = ((Session["user"] as customer).customer_id);
                List<order> order = db.orders.Where(x => x.customer_id == id).OrderBy(x => x.order_date).ToList();
                List<order_items> item = db.order_items.ToList();
                var model = new OrderInterface
                {
                    order = order,
                    item = item,
                };
                return View(model);
            }
            return RedirectToAction("Login", "Account");
        }
    }
}