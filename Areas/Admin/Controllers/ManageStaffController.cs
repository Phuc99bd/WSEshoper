using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Areas.Admin.Controllers
{
    public class ManageStaffController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/ManageStaff
        public ActionResult Index(int page=1,int pageSize =7)
        {
            if (Session["staff"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            List<staff> staff = db.staffs.Where(x => x.role != "admin").ToList();
            PagedList<staff> view = new PagedList<staff>(staff, page, pageSize);
            return View(view);
        }
    }
}