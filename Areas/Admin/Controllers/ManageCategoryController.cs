using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Areas.Admin.Controllers
{
    
    public class ManageCategoryController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/ManageCategory
        public ActionResult Index(int page=1, int pageSize = 7,string search = "")
        {
            if(Session["staff"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            List<category> category = db.categories.Where(x => x.category_name.Contains(search)).ToList();
            PagedList<category> model = new PagedList<category>(category, page, pageSize);
            return View(model);
        }
    }
}