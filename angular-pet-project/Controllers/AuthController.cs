using angular_pet_project.Models;
using angular_pet_project.Models.AuthentificationModels;
using IdentityServer4.Events;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace angular_pet_project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly ApplicationContext _applicationContext;
        
        public AuthController(UserManager<User> userManager, JwtHandler jwtHandler, ApplicationContext applicationContext)
        {
            _jwtHandler = jwtHandler;
            _userManager = userManager;
            _applicationContext = applicationContext;
        }

        [Route("login")]
        [HttpPost]
        public ActionResult LoginUser(UserSignIn user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.ErrorCount);
            }

            User u = _applicationContext.User.FirstOrDefault(el => el.Nickname == user.Nickname && el.Email == user.Email);
            
            if(u != null)
            {
                var signingCredentials = _jwtHandler.GetSigningCredentials();
                var claims = _jwtHandler.GetClaims(u);
                var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
                var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                return Ok(token);
            }

            return BadRequest();
        }

        [Route("register")]
        [HttpPost, DisableRequestSizeLimit]
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

            return Ok(StatusCode(200));
        }

        [Route("tokenvalid")]
        [HttpPost]
        public async Task<ActionResult> ValidateToken(string token)
        {
            var res = await ValidateToken(token);

            if(res != null)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
