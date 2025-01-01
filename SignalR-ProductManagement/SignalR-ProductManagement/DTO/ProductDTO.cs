using System.ComponentModel.DataAnnotations;

namespace SignalR_ProductManagement.DTO
{
    public class ProductAddDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Range(0.01, 1000000)]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Price must have up to two decimal places.")]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int? CategoryId { get; set; }
    }

    public class ProductUpdateDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [Range(0.01, 1000000)]
        [RegularExpression(@"^\d+(\.\d{1,2})?$", ErrorMessage = "Price must have up to two decimal places.")]
        public decimal Price { get; set; }

        [Required]
        public int Quantity { get; set; }

        public int? CategoryId { get; set; }
    }
}
