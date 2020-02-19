using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace RecipeBook.Models.Entity_Framework
{
    public class AngularDBContext : DbContext
    {
        public AngularDBContext() : base("name = AngularDBContext")
        {

        }

        // setting EF convention
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // use singular table name
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Food> Foods { get; set; }
    }
}