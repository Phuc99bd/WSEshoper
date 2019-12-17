using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Controllers
{
    public class HomeController : Controller
    {
        Camera db = new Camera();
        // GET: Home
        public ActionResult Index()
        {
            List<category> category = db.categories.ToList();
            Random rd1 = new Random();
            Random rd2 = new Random();
            int skip = rd1.Next(1, db.products.Count() - 6);
            int skip2 = rd2.Next(1, db.products.Count() - 9);
            List<product> product = db.products.Where(x => x.status == true).OrderByDescending(x => x.product_id).Skip(skip).ToList();
            List<product> product2 = db.products.Where(x => x.status == true).OrderBy(x => x.product_id).Skip(skip2).ToList();
            var view = new ViewHome
            {
                category = category,
                product = product,
                product2 = product2
            };
            return View(view);
        }
    }
}