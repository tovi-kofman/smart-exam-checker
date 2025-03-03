using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface IPermissionService
    {
        List<string> GetUserPermissions(string userId);
        string GetPermissionById(string userId, int index);
        void GrantPermission(string userId, string permission);
        void DeletePermission(string userId, int index);
        void UpdatePermission(string userId, int index, string newPermission);
    }
}}
