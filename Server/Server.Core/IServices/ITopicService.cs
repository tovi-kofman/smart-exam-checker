using Server.Core.Dtos;
using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface ITopicService
    {
        Task<List<TopicDto>> GetAllTopicsAsync();
        Task<TopicDto> GetByIdAsync(int id);
        Task<TopicDto> AddTopicAsync(TopicDto topic);
        Task DeleteTopicAsync(TopicDto topic);
        Task<TopicDto> UpdateTopicAsync(int id, TopicDto topic);
    }
}