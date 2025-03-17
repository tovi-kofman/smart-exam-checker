using Server.Core.Entities;

namespace Server.API.Models
{
    public class PermissionPostModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Role> Roles { get; set; }
    }
}
