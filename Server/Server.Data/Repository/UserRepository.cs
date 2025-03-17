using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Server.Core.Dtos;
using Server.Core.Entities;
using Server.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repository
{
    public class UserRepository:Repository<User>, IUserRepository
    {
        readonly DataContext _context;
        readonly IMapper _mapper;
        public UserRepository(DataContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<UserDto> GetByUserNameAsync(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return null;
            }
            var userDto = _mapper.Map<UserDto>(user);

            return userDto;
        }
    }
}
