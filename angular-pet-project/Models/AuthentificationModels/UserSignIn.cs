using angular_pet_project.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Models.AuthentificationModels
{
    [NotMapped]
    public class UserSignIn
    {
        [Required]
        public string Nickname { get; set; }
        [Required]
        [CheckEmail]
        public string Email { get; set; }
    }
}
