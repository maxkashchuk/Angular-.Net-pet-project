using angular_pet_project.Models;
using angular_pet_project.Models.AuthentificationModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        ApplicationContext DBContext;

        public UserController(ApplicationContext context)
        {
            DBContext = context;
        }

        [Route("adduser")]
        [HttpPost]
        public async Task<ActionResult> AddUser(UserRegister user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            User u = new User { Name = user.Name, Email = user.Email, BirthDate = user.BirthDate };
            await DBContext.AddAsync(u);
            await DBContext.SaveChangesAsync();
            return Ok();
        }

        [Route("adduser")]
        [HttpDelete]
        public async Task<ActionResult> DelUser(UserRegister user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }
            User u = new User { Name = user.Name, Email = user.Email, BirthDate = user.BirthDate };
            await DBContext.AddAsync(u);
            await DBContext.SaveChangesAsync();
            return Ok();
        }
    }
}
