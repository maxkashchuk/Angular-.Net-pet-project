using angular_pet_project.Models;
using angular_pet_project.Models.AuthentificationModels;
using IdentityServer4.Events;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ApplicationContext _applicationContext;
        
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ApplicationContext applicationContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _applicationContext = applicationContext;
        }

        [Route("login")]
        [HttpGet]
        public ActionResult LoginUser(UserSignIn user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }

            User u = _applicationContext.Users.Where(el => el.Nickname == user.Nickname && el.Email == user.Email).Single();
            
            if(u != null)
            {
                //await _events.RaiseAsync(new UserLoginSuccessEvent(user.UserName, user.Id, user.Name));
            }

            return BadRequest();
        }

        [Route("register")]
        [HttpPost]
        public async Task<ActionResult> RegisterUser(UserRegister user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }

            User u = new User
            {
                ActualName = user.ActualName,
                Nickname = user.Nickname,
                Email = user.Email,
                BirthDate = user.BirthDate,
                Image = user.Image,
                UserName = user.Email
            };

            var result = await _userManager.CreateAsync(u);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim("ActualName", user.ActualName));
            await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim("Nickname", user.Nickname));
            await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim("Email", user.Email));
            await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim("BirthDate", user.BirthDate.ToString()));
            try { await _userManager.AddClaimAsync(u, new System.Security.Claims.Claim("Image", user.Image.ToString())); }
            catch (Exception) { }

            return Ok(u);
        }
    }
}
