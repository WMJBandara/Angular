using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Employee
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Department { get; set; }

        public DateTime DateOfJoined { get; set; }

        public string PhotoName { get; set; } 
    }
}
