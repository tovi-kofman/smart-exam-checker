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
        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _dbSet.Remove(entity);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateAsync(int id, T entity)
        {
            var existingEntity = await _dbSet.FindAsync(id);
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
                await _dataContext.SaveChangesAsync();
                return existingEntity;
            }
            return null;
        }


    }
}
