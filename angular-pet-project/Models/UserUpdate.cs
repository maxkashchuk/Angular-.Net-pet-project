using angular_pet_project.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Models
{
    [NotMapped]
    public class UserUpdate
    {
        public string ActualName { get; set; }
        public string Nickname { get; set; }
        [CheckEmail]
        public string Email { get; set; }
        [CheckDate]
        public DateTime? BirthDate { get; set; }
        public byte[] Image { get; set; }
        
    }
}
