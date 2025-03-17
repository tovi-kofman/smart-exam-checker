using Server.Core.Entities;

namespace Server.API.Models
{
    public class ExamPostModel
    {
        public int UsertId { get; set; }

        public int TopicId { get; set; }

        //public int GradeId { get; set; }

        public int? TeacherId { get; set; }

        public List<Tag> Tags { get; set; }
    }
}
