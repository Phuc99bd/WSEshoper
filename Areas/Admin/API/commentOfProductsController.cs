using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WSCamera.Models;

namespace WSCamera.Areas.Admin.API
{
    public class commentOfProductsController : ApiController
    {
        private Camera db = new Camera();

        // GET: api/commentOfProducts
        public IQueryable<commentOfProduct> GetcommentOfProducts()
        {
            return db.commentOfProducts;
        }

        // GET: api/commentOfProducts/5
        [ResponseType(typeof(commentOfProduct))]
        public IHttpActionResult GetcommentOfProduct(int id)
        {
            commentOfProduct commentOfProduct = db.commentOfProducts.Find(id);
            if (commentOfProduct == null)
            {
                return NotFound();
            }

            return Ok(commentOfProduct);
        }

        // PUT: api/commentOfProducts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutcommentOfProduct(int id, commentOfProduct commentOfProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != commentOfProduct.comment_id)
            {
                return BadRequest();
            }

            db.Entry(commentOfProduct).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!commentOfProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/commentOfProducts
        [ResponseType(typeof(commentOfProduct))]
        public IHttpActionResult PostcommentOfProduct(commentOfProduct commentOfProduct)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            commentOfProduct.createdAt= DateTime.Now;
            db.commentOfProducts.Add(commentOfProduct);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = commentOfProduct.comment_id }, commentOfProduct);
        }

        // DELETE: api/commentOfProducts/5
        [ResponseType(typeof(commentOfProduct))]
        public IHttpActionResult DeletecommentOfProduct(int id)
        {
            commentOfProduct commentOfProduct = db.commentOfProducts.Find(id);
            if (commentOfProduct == null)
            {
                return NotFound();
            }

            db.commentOfProducts.Remove(commentOfProduct);
            db.SaveChanges();

            return Ok(commentOfProduct);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool commentOfProductExists(int id)
        {
            return db.commentOfProducts.Count(e => e.comment_id == id) > 0;
        }
    }
}