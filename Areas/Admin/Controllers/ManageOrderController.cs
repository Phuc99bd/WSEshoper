using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using WSCamera.Models;

namespace WSCamera.Areas.Admin.Controllers
{
    public class ManageOrderController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/ManageOrder
        public ActionResult Index(int page =1 ,int pageSize = 7,string search = "")
        {
            if (Session["staff"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            List<order> order = db.orders.Where(x => x.order_id.ToString().Contains(search) || x.email.Contains(search) || x.phone.Contains(search)).OrderBy(x => x.order_date).ToList();

            var model = from e in order

                        select new Order
                        {
                            order = e,
                            search = search
                        };

            PagedList<Order> result = new PagedList<Order>(model, page, pageSize);
            return View(result);
        
        }
    }
}