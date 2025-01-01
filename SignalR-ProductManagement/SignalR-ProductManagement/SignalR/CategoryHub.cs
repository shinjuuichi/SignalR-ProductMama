using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SignalR_ProductManagement.Data;

namespace SignalR_ProductManagement.SignalR
{
    public class CategoryHub(ApplicationDbContext _context) : Hub
    {
        public async Task GetCategory()
        {
            var categories = await _context.Category.ToListAsync();
            await Clients.All.SendAsync("ReceiveCategories", categories);
        }
    }

}
