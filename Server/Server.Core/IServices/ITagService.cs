using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.IServices
{
    public interface ITagService
    {
        List<string> GetAllTags();
        string GetById(int id);
        string AddTag(string tagName);
        void DeleteTag(string tagName);
        string UpdateTag(int id, string tagName);
    }
}