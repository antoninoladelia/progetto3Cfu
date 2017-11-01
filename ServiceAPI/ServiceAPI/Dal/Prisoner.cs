using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceAPI.Dal
{
    public class Prisoner
    {
        public int Id { get; set; }
        public string NamePrisoner { get; set; }
        public string Crime { get; set; }
        public DateTime DateOfBirth { get; set; }

    }

   
}
