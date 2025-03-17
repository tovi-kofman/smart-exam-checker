using Server.Core.Dtos;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface IExamService
    {
        Task<List<ExamDto>> GetAllExamsAsync();
        Task<ExamDto> GetByIdAsync(int id);
        Task<ExamDto> AddExamAsync(ExamDto exam);
        Task DeleteExamAsync(ExamDto exam);
        Task<ExamDto> UpdateExamAsync(int id, ExamDto exam);
    }
}
