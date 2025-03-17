using Server.Core.Dtos;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.IRepository
{
    public interface IUserRepository:IRepository<User>
    {
        Task<UserDto> GetByUserNameAsync(string username);
    }
}
