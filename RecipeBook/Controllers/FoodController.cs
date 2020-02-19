using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RecipeBook.Models.Entity_Framework;

namespace RecipeBook.Controllers
{
    public class FoodController : Controller
    {
        private AngularDBContext db = null;
        public FoodController()
        {
            db = new AngularDBContext();
        }
        public JsonResult Index()
        {
            var users = db.Foods.ToList();
            return Json(users, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details(int id)
        {
            var food = db.Foods.Find(id);
            return Json(food, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Create(Food food)
        {
            db.Foods.Add(food);
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult Edit(Food food)
        {
            db.Entry(food).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var food = db.Foods.Find(id);
            db.Foods.Remove(food);
            db.SaveChanges();
            return Json(null);
        }
    }
}