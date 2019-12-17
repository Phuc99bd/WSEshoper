using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;


namespace WSCamera.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login()
        {
            if(Session["user"] != null)
            {
                return RedirectToAction("Index", "Home");
            }
            if(TempData["shortMessage"] != null)
            {
                ViewBag.result = "Đăng kí thành công.";
            }
            if(TempData["error"] != null)
            {
                ViewBag.error = TempData["error"];
            }
            if (TempData["error2"] != null)
            {
                ViewBag.error2 = TempData["error2"];
            }
            
                return View();
        }
        [HttpPost]
        public ActionResult Login(customer user)
        {
            using (Camera db = new Camera())
            {
                user.password = MD5Hash(user.password);
                var result = db.customers.Where(x => x.email == user.email && x.password == user.password && x.typeLogin == "local").FirstOrDefault<customer>();
                if (result != null)
                {
                    Session.Add("user", result);
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Sai tài khoản hoặc mật khẩu");
                return View(user);
            }
        }
        [HttpPost]
        public ActionResult Register(customer user)
        {
           
                user.password = MD5Hash(user.password);
                user.typeLogin = "local";
                user.states = null;
                user.zip_code = null;
                using (Camera db = new Camera())
                {
                    
                        var result = db.customers.Count(x => x.email == user.email);
                        if (result > 0)
                        {
                              TempData["error"] = "Email đã tồn tại";
                              return RedirectToAction("Login", "Account");

                }
                else
                        {
                            db.customers.Add(user);
                            db.SaveChanges();
                        }
                    
                }
                TempData["shortMessage"] = "Đăng kí thành công";
                return RedirectToAction("Login", "Account");
            }
        public ActionResult Logout()
        {
            Session.Remove("user");
            return RedirectToAction("Login", "Account");
        }
        public static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }

    }
}