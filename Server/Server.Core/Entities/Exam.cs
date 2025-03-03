using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Exam
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TopicId { get; set; }
        public int Grade { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int? TeacherId { get; set; }
        public List<Tag> Tags { get; set; }
    }
}
