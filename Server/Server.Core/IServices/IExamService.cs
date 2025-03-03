using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface IExamService
    {
        List<string> GetAllExams();
        string GetById(int id);
        string AddExam(string examName);
        void DeleteExam(string examName);
        string UpdateExam(int id, string examName);
    }
}
