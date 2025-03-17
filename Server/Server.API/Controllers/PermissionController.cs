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
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionService _PermissionService;
        readonly IMapper _mapper;

        public PermissionController(IPermissionService permissionService, IMapper mapper)
        {
            _PermissionService = permissionService;
            _mapper = mapper;
        }

        // GET: api/<PermissionController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionDto>>> Get()
        {
            List<PermissionDto> Permissions = await _PermissionService.GetAllPermissionsAsync();
            if (Permissions == null)
            {
                return NotFound();
            }
            return Ok(Permissions);
        }

        // GET api/<PermissionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PermissionDto>> Get(int id)
        {
            PermissionDto PermissionDto = await _PermissionService.GetByIdAsync(id);
            if (PermissionDto == null)
            {
                return NotFound();
            }
            return Ok(PermissionDto);
        }

        // POST api/<PermissionController>
        [HttpPost]
        public async Task<ActionResult<PermissionDto>> Post([FromBody] PermissionPostModel permissionPostModel)
        {
            if (permissionPostModel == null)
            {
                return BadRequest("Permission cannot be null");
            }
            PermissionDto PermissionDto = _mapper.Map<PermissionDto>(permissionPostModel);
            PermissionDto = await _PermissionService.AddPermissionAsync(PermissionDto);
            if (PermissionDto == null)
            {
                return BadRequest("Added failed");
            }
            return CreatedAtAction(nameof(Get), new { id = PermissionDto.Id }, PermissionDto);
        }

        // PUT api/<PermissionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PermissionDto>> Put(int id, [FromBody] PermissionPostModel permissionPostModel)
        {
            if (permissionPostModel == null)
            {
                return BadRequest("Permission cannot be null");
            }
            PermissionDto PermissionDto = _mapper.Map<PermissionDto>(permissionPostModel);

            PermissionDto = await _PermissionService.UpdatePermissionAsync(id, PermissionDto);
            if (PermissionDto == null)
            {
                return NotFound();
            }
            return Ok(PermissionDto);
        }

        // DELETE api/<PermissionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {

            PermissionDto PermissionDto = await _PermissionService.GetByIdAsync(id);
            if (PermissionDto == null)
            {
                return NotFound();
            }
            await _PermissionService.DeletePermissionAsync(PermissionDto);
            return NoContent();
        }
    }
}