using AutoMapper;
using Server.API.Models;
using Server.Core.Dtos;

namespace Server.API
{
    public class MappingPostProfile : Profile
    {
        public MappingPostProfile() {
            CreateMap<UserPostModel, UserDto>();
            CreateMap<ExamPostModel, ExamDto>();
            CreateMap<RolePostModel, RoleDto>();
            CreateMap<PermissionPostModel, PermissionDto>();
            CreateMap<TagPostModel, TagDto>();
            CreateMap<TopicPostModel, TopicDto>();
        }
        
    }
}
