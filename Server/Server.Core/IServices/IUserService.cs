using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.IServices
{
    public interface IUserService
    {
        List<string> GetAllUsers();
        string GetById(int id);
        string AddUser(string userName);
        void DeleteUser(string userName);
        string UpdateUser(int id, string userName);
    }
}
}
