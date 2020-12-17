using Microsoft.AspNetCore.Mvc;
using SimpleWebApi.ApiParameters;
using SimpleWebApi.Models;
using SimpleWebApi.MySql;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : Controller
    {
        private readonly MySqlDbContext dbContext;

        public NotesController(MySqlDbContext dbContext) => this.dbContext = dbContext;

        [HttpPost]
        public async Task Post([FromBody] NoteParameter parameter)
        {
            var note = new Note
            {
                Title = parameter.Title,
                Text = parameter.Text
            };
            await dbContext.Notes.AddAsync(note);
            await dbContext.SaveChangesAsync();
        }

        [HttpGet]
        public IEnumerable<Note> Get() => dbContext.Notes.ToList();
    }
}