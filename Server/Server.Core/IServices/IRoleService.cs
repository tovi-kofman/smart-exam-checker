using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.IServices
{
    public interface IRoleService
    {
        List<string> GetUserRoles(string userId);
        string GetRoleById(string userId, int index);
        void AssignRole(string userId, string role);
        void DeleteRole(string userId, int index);
        void UpdateRole(string userId, int index, string newRole);
    }
}}
