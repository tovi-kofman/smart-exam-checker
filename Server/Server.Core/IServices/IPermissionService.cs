using Server.Core.Dtos;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface IPermissionService
    {

        Task<List<PermissionDto>> GetAllPermissionsAsync();
        Task<PermissionDto> GetByIdAsync(int id);
        Task<PermissionDto> AddPermissionAsync(PermissionDto permission);
        Task DeletePermissionAsync(PermissionDto permission);
        Task<PermissionDto> UpdatePermissionAsync(int id, PermissionDto permission);

    }
}
