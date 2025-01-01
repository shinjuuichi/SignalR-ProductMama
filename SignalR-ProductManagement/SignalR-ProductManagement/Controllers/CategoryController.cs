﻿using Microsoft.AspNetCore.Mvc;
using SignalR_ProductManagement.Data;
using SignalR_ProductManagement.Models;

namespace SignalR_ProductManagement.Controllers
{
    [Route("/category")]
    [ApiController]
    public class CategoryController(ApplicationDbContext _dbContext) : ControllerBase
    {
        [HttpPost("add")]
        public IActionResult Add([FromBody] string categoryName)
        {
            var category = new Category
            {
                Name = categoryName
            };
            _dbContext.Category.Add(category);  
            _dbContext.SaveChanges();
            return Ok(category);
        }

        [HttpPatch("update")]
        public IActionResult Update([FromBody] Category updatedCategory)
        {
            var category = _dbContext.Category.Find(updatedCategory.Id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            category.Name = updatedCategory.Name;
            _dbContext.Category.Update(category);
            _dbContext.SaveChanges();

            return Ok(category);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var category = _dbContext.Category.Find(id);
            if (category == null)
            {
                return NotFound("Category not found.");
            }

            _dbContext.Category.Remove(category);
            _dbContext.SaveChanges();
            return Ok();
        }
    }
}
