using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project.Attributes
{
    public class CheckEmail : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if(value != null && value.ToString().Contains("@"))
            {
                return ValidationResult.Success;
            }
            return new ValidationResult("Email was written wrong");
        }
    }

    public class CheckDate : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (Convert.ToDateTime(value).Year <= DateTime.Now.Year - 16)
            {
                return ValidationResult.Success;
            }
            return new ValidationResult("Date was written wrong");
        }
    }
}
