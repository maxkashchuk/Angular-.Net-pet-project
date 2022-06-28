using angular_pet_project.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Models.AuthentificationModels
{
    public class UserRegister
    {
        public string Name { get; set; }
        [CheckEmail]
        public string Email { get; set; }
        [CheckDate]
        public DateTime BirthDate { get; set; }
    }
}
