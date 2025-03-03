using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Grade
    {

        public int Id { get; set; }
        public int NumClass { get; set; }
        public int? NumClass2 { get; set; }
        public int? InstitutionId { get; set; }
        public int? TeacherId { get; set; }

    }
}
