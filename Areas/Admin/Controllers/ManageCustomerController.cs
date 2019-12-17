using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;
namespace WSCamera.Areas.Admin.Controllers
{
    public class ManageCustomerController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/ManageCustomer
        public ActionResult Index(int page=1,int pageSize=7,string search = "")
        {
            if (Session["staff"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            List<customer> customers = db.customers.Where(x => (x.first_name + x.last_name).Contains(search) || x.email.Contains(search)).ToList();
            PagedList<customer> model = new PagedList<customer>(customers, page, pageSize);

            return View(model);
        }
    }
}