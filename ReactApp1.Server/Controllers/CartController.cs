using Microsoft.AspNetCore.Mvc;
using ReactApp1.Data;
using ReactApp1.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] CartItem cartItem)
    {
        var existingItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.CatId == cartItem.CatId && ci.UsedID == cartItem.UsedID);

        if (existingItem != null)
        {
            existingItem.Quantity += cartItem.Quantity;
            _context.CartItems.Update(existingItem);
        }
        else
        {
            _context.CartItems.Add(cartItem);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems(string userId)
    {
        return await _context.CartItems
            .Where(ci => ci.UsedID == userId)
            .Include(ci => ci.Cat)
            .ToListAsync();
    }
}

