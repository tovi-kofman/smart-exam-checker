using Server.Core.Dtos;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.IServices
{
    public interface IUserService
    {
        Task<List<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> GetByUserNameAsync(string username);
        Task<UserDto> AddUserAsync(UserDto user);
        Task DeleteUserAsync(UserDto user);
        Task<UserDto> UpdateUserAsync(int id, UserDto user);
    }
}

