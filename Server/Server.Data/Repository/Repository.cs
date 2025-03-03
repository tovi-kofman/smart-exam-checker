using Microsoft.EntityFrameworkCore;
using Server.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbSet<T> _dbSet;
        private readonly IDataContext _dataContext;

        public Repository(DataContext context)
        {
            _dataContext = context;
            _dbSet = context.Set<T>();
        }
        public T Add(T entity)
        {
            _dbSet.Add(entity);
            return entity;
        }

        public void Delete(T entity)
        {
            _dbSet.Remove(entity);
        }


        public IEnumerable<T> GetAll()
        {
            return _dbSet.ToList();
        }

        public T? GetById(int id)
        {
            return _dbSet.Find(id);
        }
        public T Update(int id, T entity)
        {
            var existingEntity = _dbSet.Find(id);
            if (existingEntity != null)
            {
                var properties = typeof(T).GetProperties();
                foreach (var property in properties)
                {
                    if (property.CanWrite && property.Name != "Id")
                    {
                        var newValue = property.GetValue(entity);
                        property.SetValue(existingEntity, newValue);
                    }
                }
                _dataContext.Entry(existingEntity).State = EntityState.Modified;
                return existingEntity;
            }
            return null;

        }


    }
}
