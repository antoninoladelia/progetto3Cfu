using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ServiceAPI
{
    [Route ("api")]
    public class CourseController:Controller
    {
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

        [HttpGet("cells")]
        public async Task<IActionResult> GetCourse() {
        
                using (var context = new PrisonDbContext())
                {
                    return Ok(await context.Cells.ToListAsync());
                }
            

        }
    }
}
