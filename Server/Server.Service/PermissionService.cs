﻿using Server.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Server.Core.IServices;
using Server.Core.Entities;
using System.Collections.Generic;
using Server.Core.IRepository;
using AutoMapper;
using Server.Core.Dtos;

namespace Server.Service
{
    public class PermissionService : IPermissionService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public PermissionService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<List<PermissionDto>> GetAllPermissionsAsync()
        {
            var permissions = await _repositoryManager.Permissions.GetAllAsync();
            return _mapper.Map<IEnumerable<PermissionDto>>(permissions).ToList();

        }

        public async Task<PermissionDto> GetByIdAsync(int id)
        {
            Permission permission = await _repositoryManager.Permissions.GetByIdAsync(id);
            PermissionDto permissionDto = _mapper.Map<PermissionDto>(permission);
            return permissionDto;
        }

        public async Task<PermissionDto> AddPermissionAsync(PermissionDto permissionDto)
        {
            Permission permission = _mapper.Map<Permission>(permissionDto);
            permission = await _repositoryManager.Permissions.AddAsync(permission);
            await _repositoryManager.SaveAsync();
            permissionDto = _mapper.Map<PermissionDto>(permission);
            return permissionDto;
        }

        public async Task DeletePermissionAsync(PermissionDto permissionDto)
        {
            Permission permission = _mapper.Map<Permission>(permissionDto);
            await _repositoryManager.Permissions.DeleteAsync(permission);
            await _repositoryManager.SaveAsync();
        }

        public async Task<PermissionDto> UpdatePermissionAsync(int id, PermissionDto permissionDto)
        {
            Permission Permission = _mapper.Map<Permission>(permissionDto);
            Permission = await _repositoryManager.Permissions.UpdateAsync(id, Permission);
            await _repositoryManager.SaveAsync();
            permissionDto = _mapper.Map<PermissionDto>(Permission);
            return permissionDto;
        }



    }
}
