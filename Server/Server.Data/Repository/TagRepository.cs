using Server.Core.Entities;
using Server.Core.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repository
{
    public class TagRepository : Repository<Tag>, ITagRepository
    {
        public TagRepository(DataContext context) : base(context)
        {
        }
    }
}
