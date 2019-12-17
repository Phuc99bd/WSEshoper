using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;
using System.Security.Cryptography;
using System.Text;

namespace WSCamera.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(staff staffs)
        {
            staff item = db.staffs.Where(x => x.email == staffs.email && x.password == staffs.password).FirstOrDefault<staff>();
            if (item == null)
            {
                ViewBag.error = "Sai tài khoản hoặc mật khẩu.";
                return Index();
            }

            Session.Add("staff", item);
            return RedirectToAction("Index", "ManageCategory");
        }
        public ActionResult Logout()
        {
            Session.Remove("staff");
      
            return RedirectToAction("Index", "Login");
        }

    }
}