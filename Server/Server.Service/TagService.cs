using Server.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Server.Core.IServices;
using Server.Core.Entities;
using System.Collections.Generic;
using Server.Core.IRepository;
using AutoMapper;
using Server.Core.Dtos;

namespace Server.Service
{
    public class TagService : ITagService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TagService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<List<TagDto>> GetAllTagsAsync()
        {
            var tags = await _repositoryManager.Tags.GetAllAsync();
            return _mapper.Map<IEnumerable<TagDto>>(tags).ToList();

        }

        public async Task<TagDto> GetByIdAsync(int id)
        {
            Tag tag = await _repositoryManager.Tags.GetByIdAsync(id);
            TagDto tagDto = _mapper.Map<TagDto>(tag);
            return tagDto;
        }

        public async Task<TagDto> AddTagAsync(TagDto tagDto)
        {
            Tag tag = _mapper.Map<Tag>(tagDto);
            tag = await _repositoryManager.Tags.AddAsync(tag);
            await _repositoryManager.SaveAsync();
            tagDto = _mapper.Map<TagDto>(tag);
            return tagDto;
        }

        public async Task DeleteTagAsync(TagDto tagDto)
        {
            Tag tag = _mapper.Map<Tag>(tagDto);
            await _repositoryManager.Tags.DeleteAsync(tag);
            await _repositoryManager.SaveAsync();
        }

        public async Task<TagDto> UpdateTagAsync(int id, TagDto tagDto)
        {
            Tag tag = _mapper.Map<Tag>(tagDto);
            tag = await _repositoryManager.Tags.UpdateAsync(id, tag);
            await _repositoryManager.SaveAsync();
            tagDto = _mapper.Map<TagDto>(tag);
            return tagDto;
        }



    }
}