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
        public IActionResult Add([FromBody] ProductAddDTO productAddDTO)
        {
            var category = _dbContext.Category.Find(productAddDTO.CategoryId);

            var product = new Product
            {
                Name = productAddDTO.Name,
                Price = productAddDTO.Price,
                Quantity = productAddDTO.Quantity,
                Category = category,
            };

            _dbContext.Product.Add(product);
            _dbContext.SaveChanges();
            return Ok(product);
        }

        [HttpPatch("update")]
        public IActionResult Update([FromBody] ProductUpdateDTO productUpdateDTO)
        {
            var product = _dbContext.Product.Find(productUpdateDTO.Id);

            product.Name = productUpdateDTO.Name;   
            product.Price = productUpdateDTO.Price;
            product.Quantity = productUpdateDTO.Quantity;
            product.Category = _dbContext.Category.Find(productUpdateDTO.CategoryId);

            _dbContext.Product.Update(product);
            _dbContext.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var product = _dbContext.Product.Find(id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            _dbContext.Product.Remove(product);
            _dbContext.SaveChanges();
            return Ok(product);
        }
    }
}
