using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;


namespace WSCamera.Controllers
{
    public class ProfileController : Controller
    {
        Camera db = new Camera();
        // GET: Profile
        public ActionResult Index()
        {
            if (Session["user"] != null)
            {
                int id = ((Session["user"] as customer).customer_id);
                customer customer = db.customers.Find(id);
                return View(customer);
            }
            return RedirectToAction("Login", "Account");
        }
        [HttpPost]
        public ActionResult Index(customer customer)
        {

            int id = ((Session["user"] as customer).customer_id);
            customer item = db.customers.Find(id);
            item.first_name = customer.first_name;
            item.last_name = customer.last_name;
            item.phone = customer.phone;
            item.street = customer.street;
            item.city = customer.city;
            item.zip_code = customer.zip_code;
            db.SaveChanges();
            ViewBag.success = "Cập nhật thông tin thành công";
            return Index();




        }
    }
}