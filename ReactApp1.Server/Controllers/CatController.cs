using Microsoft.AspNetCore.Mvc;
using ReactApp1.Data;
using ReactApp1.Server.Models;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class CatController : ControllerBase
{
    private readonly AppDbContext _context;

    public CatController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cat>>> GetCats()
    {
        return await _context.Cats.ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Cat>> GetCat(int id)
    {
        var cat = await _context.Cats.FindAsync(id);

        if (cat == null)
        {
            return NotFound();
        }

        return cat;
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Cat>>> SearchCats([FromQuery] string breed, [FromQuery] int? age, [FromQuery] int? minPrice, [FromQuery] int? maxPrice)
    {
        var query = _context.Cats.AsQueryable();

        if (!string.IsNullOrEmpty(breed))
        {
            query = query.Where(c => c.Breed.Contains(breed));
        }

        if (age.HasValue)
        {
            query = query.Where(c => c.Age == age.Value);
        }

        if (minPrice.HasValue)
        {
            query = query.Where(c => c.Price >= minPrice.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(c => c.Price <= maxPrice.Value);
        }

        return await query.ToListAsync();
    }
}
