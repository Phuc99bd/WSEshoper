using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PagedList;
using WSCamera.Models;

namespace WSCamera.Areas.Admin.API
{
    public class SearchController : Controller
    {
        Camera db = new Camera();
        // GET: Admin/Search
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult SearchUsers(string search)
        {
            List<customer> customers = db.customers.Where(x => (x.first_name + x.last_name).Contains(search) || x.email.Contains(search)).ToList();
            var data = new
            {
                customer = customers,
                numOfResult = customers.Count,
                pages = Math.Ceiling((float)customers.Count / 7),
                search = search
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SearchProducts(string search)
        {
            List<category> category = db.categories.ToList();
            List<product> product = db.products.Where(x => x.product_name.Contains(search)).ToList();
            var productIncategory = from e in product
                                    join d in category on e.category_id equals d.category_id

                                    select new ViewModel
                                    {
                                        product = e,
                                        category = d
                                    };
            var data = new
            {
                product = productIncategory,
                numOfResult = product.Count,
                pages = Math.Ceiling((float)product.Count / 7),
                search = search
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult UploadFile()
        {
            try
            {
                var fileOne = Request.Files["file"];

                string filename = null;
               
                if ((fileOne != null) && (fileOne.ContentLength > 0) && !string.IsNullOrEmpty(fileOne.FileName))
                {
                    var readfile = new List<string>();
                  
                        var filePath = Server.MapPath("~/Images/" + fileOne.FileName);
                        fileOne.SaveAs(filePath);
                        readfile.Add(filePath);
                        filename = fileOne.FileName;
                      return Json(new { filename = filename },JsonRequestBehavior.AllowGet);

                }
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(new { }, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ListCategory()
        {
            List<category> category = db.categories.ToList();
            return Json(new { category = category }, JsonRequestBehavior.AllowGet);
        }
    }
}