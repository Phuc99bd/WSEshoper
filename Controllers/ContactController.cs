using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WSCamera.Models;
using WSCamera.Helper;
namespace WSCamera.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(supportContact contact)
        {
            try
            {
                Xmail.XMail.SendContact("vanquangphu47@gmail.com", "Góp ý - Hỏi Đáp", contact.username, contact.email, contact.phone, contact.content);
                ViewBag.success = "Gửi thành công!";
                return Index();
            }
            catch (Exception e)
            {
                ViewBag.error = "Có lỗi ở phía server. Vui lòng liên hệ lại sau!" + e;
                return Index();
            }
        }
    }
}