using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Areas.Admin.Controllers
{
    public class ManageProductController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/ManageProduct
        public ActionResult Index(int page=1,int pageSize =7,string search = "")
        {
            if (Session["staff"] == null)
            {
                return RedirectToAction("Index", "Login");
            }
            List<category> category = db.categories.ToList();
            List<product> product = db.products.Where(x => x.product_name.Contains(search)).ToList();
            var productIncategory = from e in product
                                    join d in category on e.category_id equals d.category_id

                                    select new ViewModel
                                    {
                                        product = e,
                                        category = d,
                                        search = search
                                    };
            PagedList<ViewModel> model = new PagedList<ViewModel>(productIncategory, page, pageSize);

            return View(model);
        }
    }
}