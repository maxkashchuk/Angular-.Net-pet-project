using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace angular_pet_project
{
    public class DBInitializer
    {
        async public static void Initialize(ApplicationContext context)
        {
            await context.Database.EnsureCreatedAsync();
        }
    }
}
