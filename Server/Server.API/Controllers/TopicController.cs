using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;

using Server.Core.Dtos;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

using Server.Core.Entities;
using Server.Core.IServices;
using System.Collections.Generic;

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicService _topicService;
        private readonly IMapper _mapper;

        public TopicController(ITopicService topicService, IMapper mapper)
        {
            _topicService = topicService;
            _mapper = mapper;
        }

        // GET: api/<TopicController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopicDto>>> Get()
        {
            List<TopicDto> topics = await _topicService.GetAllTopicsAsync();
            if (topics == null)
            {
                return NotFound();
            }
            var topicDtos = _mapper.Map<List<TopicDto>>(topics);
            return Ok(topicDtos);
        }

        // GET api/<TopicController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TopicDto>> Get(int id)
        {
            TopicDto topic = await _topicService.GetByIdAsync(id);
            if (topic == null)
            {
                return NotFound();
            }
            var topicDto = _mapper.Map<TopicDto>(topic);
            return Ok(topicDto);
        }

        // POST api/<TopicController>
        [HttpPost]
        public async Task<ActionResult<TopicDto>> Post([FromBody] TopicPostModel topicPostModel)
        {
            if (topicPostModel == null)
            {
                return BadRequest("Topic cannot be null");
            }
            var topicDto = _mapper.Map<TopicDto>(topicPostModel);
            topicDto = await _topicService.AddTopicAsync(topicDto);
            if (topicDto == null)
            {
                return BadRequest("Added failed");
            }
            return CreatedAtAction(nameof(Get), new { id = topicDto.Id }, topicDto);
        }

        // PUT api/<TopicController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<TopicDto>> Put(int id, [FromBody] TopicPostModel topicPostModel)
        {
            if (topicPostModel == null)
            {
                return BadRequest("Topic cannot be null");
            }
            var topicDto = _mapper.Map<TopicDto>(topicPostModel);
            topicDto = await _topicService.UpdateTopicAsync(id, topicDto);
            if (topicDto == null)
            {
                return NotFound();
            }
            return Ok(topicDto);
        }

        // DELETE api/<TopicController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            TopicDto topic = await _topicService.GetByIdAsync(id);
            if (topic == null)
            {
                return NotFound();
            }
            await _topicService.DeleteTopicAsync(topic);
            return NoContent();
        }
    }
}