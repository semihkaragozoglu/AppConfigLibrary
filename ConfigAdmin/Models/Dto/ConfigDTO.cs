using ConfigAdmin.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConfigAdmin.Models.Dto
{
    public class ConfigDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public bool IsActive { get; set; }
        public string ApplicationName { get; set; }
    }

    public class ConfigRequestDTO
    {
        public string Keyword { get; set; }
        public int CurrentPageNumber { get; set; }
        public int PageLength { get; set; } 
    }

    public class ConfigResponseDTO
    {
        public List<ConfigDTO> Configurations { get; set; }
        public int CurrentPageNumber { get; set; }
        public int PageLength { get; set; }

        public int TotalItemCount { get; set; }

    }
}
