using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data
{
    public interface IDataContext
    {
        public DbSet<Exam> Exams { get; set; }
        //public DbSet<Grade> Grades { get; set; }
        //public DbSet<Institution> Institutions { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<User> Users { get; set; }
        EntityEntry Entry(object entity);
        public Task<int> SaveChangesAsync();

    }
}
