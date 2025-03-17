﻿using Server.Core.IRepository;
using Server.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Server.Core.IServices;
using Server.Core.Entities;
using System.Collections.Generic;
using AutoMapper;
using Server.Core.Dtos;

namespace Server.Service
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public UserService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _repositoryManager.Users.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users).ToList();

        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            User user = await _repositoryManager.Users.GetByIdAsync(id);
            UserDto userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<UserDto> GetByUserNameAsync(string username)
        {
            var userDto = await _repositoryManager.Users.GetByUserNameAsync(username);
            return userDto;
        }



        public async Task<UserDto> AddUserAsync(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            user = await _repositoryManager.Users.AddAsync(user);
            await _repositoryManager.SaveAsync();
            userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task DeleteUserAsync(UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            await _repositoryManager.Users.DeleteAsync(user);
            await _repositoryManager.SaveAsync();
        }

        public async Task<UserDto> UpdateUserAsync(int id, UserDto userDto)
        {
            User user = _mapper.Map<User>(userDto);
            user = await _repositoryManager.Users.UpdateAsync(id, user);
            await _repositoryManager.SaveAsync();
            userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

       
    }
}
