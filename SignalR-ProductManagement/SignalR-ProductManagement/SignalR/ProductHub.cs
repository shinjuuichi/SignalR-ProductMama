using Microsoft.AspNetCore.SignalR;
using SignalR_ProductManagement.Models;
using System.Threading.Tasks;
using System.Linq;
using SignalR_ProductManagement.Data;
using Microsoft.EntityFrameworkCore;

namespace SignalR_ProductManagement.SignalR
{
    public class ProductHub(ApplicationDbContext _context) : Hub
    {
        public async Task GetProduct()
        {
            var products = await _context.Product
                .Include(p => p.Category) 
                .ToListAsync();

            await Clients.All.SendAsync("ReceiveProducts", products);
        }
    }
}
