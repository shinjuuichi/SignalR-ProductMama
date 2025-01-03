using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_ProductManagement.Data;
using SignalR_ProductManagement.DTO;
using SignalR_ProductManagement.Models;
using SignalR_ProductManagement.SignalR;

namespace SignalR_ProductManagement.Controllers
{
    [Route("/product")]
    [ApiController]
    public class ProductController(ApplicationDbContext _dbContext) : ControllerBase
    {
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ProductAddDTO productAddDTO)
        {
            var category = await _dbContext.Category.FindAsync(productAddDTO.CategoryId);

            if (category == null)
            {
                return NotFound("Category not found.");
            }

            var product = new Product
            {
                Name = productAddDTO.Name,
                Price = productAddDTO.Price,
                Quantity = productAddDTO.Quantity,
                Category = category,
            };

            await _dbContext.Product.AddAsync(product);
            await _dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPatch("update")]
        public async Task<IActionResult> Update([FromBody] ProductUpdateDTO productUpdateDTO)
        {
            var product = _dbContext.Product.Find(productUpdateDTO.Id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            product.Name = productUpdateDTO.Name;
            product.Price = productUpdateDTO.Price;
            product.Quantity = productUpdateDTO.Quantity;
            var category = await _dbContext.Category.FindAsync(productUpdateDTO.CategoryId);

            if (category == null)
            {
                return NotFound("Category not found.");
            }
            product.Category = category;

            _dbContext.Product.Update(product);
            await _dbContext.SaveChangesAsync();
            return Ok(product);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = _dbContext.Product.Find(id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            _dbContext.Product.Remove(product);
            await _dbContext.SaveChangesAsync();
            return Ok(product);
        }
    }
}
