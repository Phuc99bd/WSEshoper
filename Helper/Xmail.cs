using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;
using WSCamera.Models;

namespace WSCamera.Helper
{
    public class Xmail
    {
        public class XMail
        {
            /// <summary>
            /// Gửi email từ hệ thống thông qua tài khoản gmail
            /// </summary>
            /// <param name="to">Email người nhận</param>
            /// <param name="subject">Tiêu đề mail</param>
            /// <param name="body">Nội dung mail</param>
            ///
            public static void SendContact(String to, String subject, string username, string email, string phone, string content)
            {

                string body = "<h3>" + username + " vừa gửi cho bạn một Liên hệ </h3><br><p><strong>Email: </strong>" + email + "</p><p><strong>Phone :</strong>" + phone + "</p><p><strong>Nội dung: </strong>" + content + "</p>";
                var from = "Web Master <phamanh211099@gmail.com>";
                Send(from, to, subject, body);
            }
            public static void Send(String to, int typeSubject, int typeBody, order order, List<CartItem> cart)
            {
                string itemDetail = "<table style='border - collapse:collapse; width: 100 %; border - top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px'><tr style='background: #e8e8e8;'> <td style='border: 1px solid #e8e8e8;'>Sản phẩm</td><td style='border: 1px solid #e8e8e8;'>Số lượng</td><td style='border: 1px solid #e8e8e8;'>Giá</td><td style='border: 1px solid #e8e8e8;'>Tổng</td> </tr>";
                int total = 0;
                for (int i = 0; i < cart.Count; i++)
                {
                    total += (int)cart[i].cart.list_price * cart[i].quantity;
                    itemDetail += "<tr><td>" + cart[i].cart.product_name + "</td> <td>" + cart[i].quantity + "</td> <td>" + cart[i].cart.list_price + " đ</td> <td>" + cart[i].cart.list_price * cart[i].quantity + " đ</td> </tr>";
                }
                itemDetail += "<tr><td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'><strong>Thành tiền: </strong></td> <td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'>" + total + " đ</td> </tr>";
                itemDetail += "<tr><td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'><strong>Free Ship </strong></td> <td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'>0 đ</td> </tr>";
                itemDetail += "<tr><td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'><strong>Tổng số: </strong></td> <td colspan='2' style='text-align: right; border: 1px solid #e8e8e8; padding: 2px 5px;'>" + total + " đ</td> </tr></table> ";

                string subject = (typeSubject == 0) ? "Order" + order.order_id : "Đặt hàng thành công";
                string body = " <p>Cám ơn bạn đã quan tâm sản phẩm E-Shoper. Đơn hàng của bạn đã nhận và sẽ được xử lý ngay khi bạn xác nhận thanh toán.</p> <table style='border - collapse:collapse; width: 100 %; border - top:1px solid #dddddd;border-left:1px solid #dddddd;margin-bottom:20px'><tr><td style='padding: 2px 5px; background: #e8e8e8; border: 1px solid #e8e8e8;' colspan='2'>Chi tiết đơn hàng</td></tr><tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong> ID đơn hàng:</strong> " + order.order_id + " </td><tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong>Email: </strong>" + order.email + "</td></tr><tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong> Ngày tạo  </strong> " + order.order_date + " </td><td><strong> Điện thoại</strong> : " + order.phone + "</td></tr> <tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong> Ngày giao dự kiến </strong>" + order.shipped_date + " </td><tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong> Street </strong> : " + order.street + "</td></tr><tr style='border-left: 1px solid #e8e8e8;border-right: 1px solid #e8e8e8;'><td><strong> City: </strong> " + order.city + " </td><td><strong> Phương thức thanh toán </strong> : Thanh toán khi nhận hàng</td></tr> </table><br>" + itemDetail;

                var from = "Web Master <phuccog@gmail.com>";
                Send(from, to, subject, body);
            }

            /// <summary>
            /// Gửi email đơn giản thông qua tài khoản gmail
            /// </summary>
            /// <param name="from">Email người gửi</param>
            /// <param name="to">Email người nhận</param>
            /// <param name="subject">Tiêu đề mail</param>
            /// <param name="body">Nội dung mail</param>
            public static void Send(String from, String to, String subject, String body)
            {
                String cc = "";
                String bcc = "";
                String attachments = "";
                Send(from, to, cc, bcc, subject, body, attachments);
            }

            /// <summary>
            /// Gửi email thông qua tài khoản gmail
            /// </summary>
            /// <param name="from">Email người gửi</param>
            /// <param name="to">Email người nhận</param>
            /// <param name="cc">Danh sách email những người cùng nhận phân cách bởi dấu phẩy</param>
            /// <param name="bcc">Danh sách email những người cùng nhận phân cách bởi dấu phẩy</param>
            /// <param name="subject">Tiêu đề mail</param>
            /// <param name="body">Nội dung mail</param>
            /// <param name="attachments">Danh sách file định kèm phân cách bởi phẩy hoặc chấm phẩy</param>
            public static void Send(String from, String to, String cc, String bcc, String subject, String body, String attachments)
            {
                var message = new MailMessage();
                message.IsBodyHtml = true;
                message.From = new MailAddress(from);
                message.To.Add(new MailAddress(to));
                message.Subject = subject;
                message.Body = body;
                message.ReplyToList.Add(from);
                if (cc.Length > 0)
                {
                    message.CC.Add(cc);
                }
                if (bcc.Length > 0)
                {
                    message.Bcc.Add(bcc);
                }
                if (attachments.Length > 0)
                {
                    String[] fileNames = attachments.Split(';', ',');
                    foreach (var fileName in fileNames)
                    {
                        message.Attachments.Add(new Attachment(fileName));
                    }
                }

                // Kết nối GMail
                var client = new SmtpClient("smtp.gmail.com", 25)
                {
                    Credentials = new NetworkCredential("vanquangphu47@gmail.com", "quangphu04071999"),
                    EnableSsl = true
                };
                // Gởi mail
                client.Send(message);
            }
        }
    }
}