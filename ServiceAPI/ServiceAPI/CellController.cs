using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ServiceAPI
{
    [Route ("api")]
    public class CourseController:Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        [HttpPut("cells")]
        public async Task<IActionResult> CreateCourse([FromBody]Cell Cell)
    {
            
        using (var context = new PrisonDbContext())
        {
            context.Cells.Add(Cell);
            await context.SaveChangesAsync();
        }
        return Ok();
    }

        [HttpPost("cells")]
        public async Task<IActionResult> UpdateCell([FromBody]Cell cell)
        {
            using (var context = new PrisonDbContext())
            {
                context.Cells.Update(cell);
                await context.SaveChangesAsync();
                return Ok();
            }
        }




        [HttpGet("cells")]
        public async Task<IActionResult> GetCourse() {
        
                using (var context = new PrisonDbContext())
                {
                    return Ok(await context.Cells.ToListAsync());
                }
            

        }
    }
}
