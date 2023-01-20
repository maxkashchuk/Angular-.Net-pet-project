using angular_pet_project.Models;
using angular_pet_project.Models.AuthentificationModels;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
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
                return BadRequest(ModelState.ErrorCount);
            }
            User u = new User { ActualName = user.ActualName, Nickname = user.Nickname, Email = user.Email, BirthDate = user.BirthDate}; //, Image = user.Image
            await DBContext.AddAsync(u);
            await DBContext.SaveChangesAsync();
            return Ok();
        }

        [Route("readuser")]
        [HttpGet("{id:int}")]
        public ActionResult GetUser(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }
            User user = DBContext.User.First(x => x.Id == id);
            return Ok(user);
        }

        [Route("deluser")]
        [HttpDelete]
        public async Task<ActionResult> DelUser(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }
            User user = DBContext.User.First(x => x.Id == id);
            DBContext.Remove(user);
            await DBContext.SaveChangesAsync();
            return Ok();
        }

        [Route("upuser")]
        [HttpPut]
        public async Task<ActionResult> UpdateUser(string id, UserUpdate user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }
            User u = DBContext.User.First(x => x.Id == id);
            u.ActualName = (user.ActualName != null) ? user.ActualName : u.ActualName;
            u.Nickname = (user.Nickname != null) ? user.Nickname : u.Nickname;
            u.Email = (user.Email != null) ? user.Email : u.Email;
            u.BirthDate = (user.BirthDate != null) ? user.BirthDate : u.BirthDate;
            u.Image = (user.Image != null) ? user.Image : u.Image;
            DBContext.Update(user);
            await DBContext.SaveChangesAsync();
            return Ok();
        }
    }
}