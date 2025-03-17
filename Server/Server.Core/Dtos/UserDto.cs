﻿using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Dtos
{
    public class UserDto
    {
        //public int Id { get; set; }
        //public string Tz { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string? Address { get; set; }
        //public string Email { get; set; }
        //public string Password { get; set; }

        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        //public DateTime? UpdatedAt { get; set; }


        public int Id { get; set; }
        public string? Tz { get; set; }
        //public string FirstName { get; set; }
        public string Username { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string PasswordHash { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? UpdatedAt { get; set; }
        public List<Role> Roles { get; set; }
    }
}
