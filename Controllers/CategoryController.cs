using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;
namespace WSCamera.Controllers
{
    public class CategoryController : Controller
    {
        Camera db = new Camera();
        // GET: Category
        public ActionResult Index(int id=5,int page=1,int pageSize =9)
        {
            List<product> product = db.products.Where(x=>x.category_id ==id).ToList();
            var view = from e in product
                       select new productDs
                       {
                           product = e
                       };
            PagedList<productDs> model = new PagedList<productDs>(view, page, pageSize);
            ViewBag.Title = db.categories.Find(id).category_name;
            return View(model);
        }
    }
}