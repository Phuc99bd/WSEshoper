using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Controllers
{
    public class SingleProductController : Controller
    {
        Camera db = new Camera();
        // GET: SingleProduct
        public ActionResult Index(int id=1)
        {
            product detail;
            List<product> productLQ;    
            List<product> productList;
          
                detail = db.products.Find(id);
                productLQ = db.products.Where(x => x.category_id == detail.category_id && x.status == true).ToList();
            
            List<category> category = db.categories.ToList();
            productList = db.products.Where(x => x.status == true).ToList();
            List<commentOfProduct> comment = db.commentOfProducts.Where(x => x.product_id == detail.product_id).ToList();
            var view = new viewSingleProduct { category = category ,details = detail, comment = comment,productLQ = productLQ, productList = productList };
            ViewBag.Title = detail.product_name;
            return View(view);
        }
    }
}