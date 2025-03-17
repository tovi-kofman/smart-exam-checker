using Server.Core.Entities;
using Server.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repository
{
    public class ExamRepository : Repository<Exam>, IExamRepository
    {
        readonly IDataContext _context;
        public ExamRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
