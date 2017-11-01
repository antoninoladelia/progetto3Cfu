using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace ServiceAPI
{
    [Route("api")]
    public class ServiceApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        [HttpGet("setup")]
        public IActionResult SetupDatabase()
        {
            lock (setupLock)
            {
                using (var context = new PrisonDbContext())
                {
                    // Create database
                    context.Database.EnsureCreated();
                }
                return Ok("database created");
            }
        }


        [HttpGet("prisoners")]
        public async Task<IActionResult> GetPrisoners()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new PrisonDbContext())
                {
                    return Ok(await context.Prisoners.ToListAsync());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }


        [HttpPut("prisoners")]
        public async Task<IActionResult> CreatePrisoner([FromBody]Prisoner prisoner)
        {
            using (var context = new PrisonDbContext())
            {
                context.Prisoners.Add(prisoner);
                

                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpPost("prisoners")]
        public async Task<IActionResult> UpdateStudent([FromBody]Prisoner prisoner)
        {
            using (var context = new PrisonDbContext())
            {
                context.Prisoners.Update(prisoner);
                await context.SaveChangesAsync();
                return Ok();
            }
        }


        [HttpDelete("prisoners")]
        public async Task<IActionResult> DeletePrisoner([FromQuery]int id)
        {
            using (var context = new PrisonDbContext())
            {
                var prisoner = await context.Prisoners.FirstOrDefaultAsync(x => x.Id == id);
                context.Prisoners.Remove(prisoner);
                await context.SaveChangesAsync();
                return Ok();


            }
        }
    }
}
