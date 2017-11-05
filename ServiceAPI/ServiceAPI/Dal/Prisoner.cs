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
        public string SurnamePrisoner { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Residence { get; set; }
        public string BirthPlace { get; set; }
        public string Crime { get; set; }
        public DateTime StartPenality { get; set; }
        public DateTime EndPenality { get; set; }

        


    }

   
}
