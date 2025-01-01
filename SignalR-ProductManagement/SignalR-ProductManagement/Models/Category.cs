﻿using System.ComponentModel.DataAnnotations;

namespace SignalR_ProductManagement.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
