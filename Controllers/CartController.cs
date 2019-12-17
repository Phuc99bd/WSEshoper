using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using PagedList;

namespace WSCamera.Controllers
{
    public class CartController : Controller
    {
        Camera db = new Camera();
        // GET: Cart
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult Buy(int id)
        {
            if (Session["Cart"] == null)
            {
                List<CartItem> cart = new List<CartItem>();
                product product = db.products.Find(id);
                cart.Add(new CartItem { cart = product, quantity = 1 });
                Session["Cart"] = cart;
            }
            else
            {
                List<CartItem> cart = (List<CartItem>)Session["Cart"];
                int index = isExist(id);
                if (index != -1)
                {
                    cart[index].quantity++;
                }
                else
                {
                    cart.Add(new CartItem { cart = db.products.Find(id), quantity = 1 });
                }
                Session["Cart"] = cart;
            }
            return Json(new { cart = Session["Cart"] }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult Remove(int id)
        {
            List<CartItem> cart = (List<CartItem>)Session["Cart"];
            int index = isExist(id);
            cart.RemoveAt(index);
            Session["Cart"] = cart;
            if (cart.Count == 0)
            {
                Session.Remove("Cart");
            }
            return Json(new { cart = (List<CartItem>)Session["Cart"] }, JsonRequestBehavior.AllowGet);
        }
  
        public JsonResult UpCountSP(int id)
        {
            List<CartItem> cart = (List<CartItem>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
            {
                if(cart[i].cart.product_id == id)
                {
                    cart[i].quantity = cart[i].quantity + 1;
                }
            }
            return Json(new { cart = cart }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DownCountSP(int id)
        {
            List<CartItem> cart = (List<CartItem>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
            {
                if (cart[i].cart.product_id == id)
                {
                    cart[i].quantity = cart[i].quantity - 1;
                    if (cart[i].quantity < 1)
                    {
                        Remove(cart[i].cart.product_id);
                    }
                }
            }
            return Json(new { cart = cart }, JsonRequestBehavior.AllowGet);
        }
        [HttpPut]
        public JsonResult Update(List<CartItem> cartNew)
        {
            List<CartItem> cart = (List<CartItem>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
            {
                if (cart[i].cart.product_id == cartNew[i].cart.product_id)
                {
                    if (cartNew[i].quantity < 1)
                    {
                        Remove(cartNew[i].cart.product_id);
                    }
                    else
                    {
                        cart[i].quantity = cartNew[i].quantity;
                    }
                }
            }
            Session["Cart"] = cart;
            return Json(new { cart = (List<CartItem>)Session["Cart"] }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BuyByQuantity(int id, int quantity)
        {
            if (Session["Cart"] == null)
            {
                List<CartItem> cart = new List<CartItem>();
                product product = db.products.Find(id);
                cart.Add(new CartItem { cart = product, quantity = quantity });
                Session["Cart"] = cart;
            }
            else
            {
                List<CartItem> cart = (List<CartItem>)Session["Cart"];
                int index = isExist(id);
                if (index != -1)
                {
                    cart[index].quantity += quantity;
                }
                else
                {
                    cart.Add(new CartItem { cart = db.products.Find(id), quantity = quantity });
                }
                Session["Cart"] = cart;
            }
            return Json(new { cart = (List<CartItem>)Session["Cart"] }, JsonRequestBehavior.AllowGet);
        }
        private int isExist(int id)
        {
            List<CartItem> cart = (List<CartItem>)Session["cart"];
            for (int i = 0; i < cart.Count; i++)
                if (cart[i].cart.product_id.Equals(id))
                    return i;
            return -1;
        }
    }
}