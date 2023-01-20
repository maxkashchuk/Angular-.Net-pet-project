using angular_pet_project.Attributes;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Models
{
    public class User : IdentityUser
    {
        public override string Id { get; set; }
        public string ActualName { get; set; }
        public string Nickname { get; set; }
        public override string Email { get; set; }
        public DateTime? BirthDate { get; set; }
        [Column(TypeName = "NVARCHAR(Max)")]
        public string Image { get; set; }
    }
}
