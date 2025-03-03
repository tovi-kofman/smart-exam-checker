using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Core.IServices
{
    public interface ITopicService
    {
        List<string> GetAllTopics();
        string GetById(int id);
        string AddTopic(string topicName);
        void DeleteTopic(string topicName);
        string UpdateTopic(int id, string topicName);
    }
}