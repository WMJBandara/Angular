using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using WebApi.Model;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IConfiguration configuration;
        private IWebHostEnvironment _env;
        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            this.configuration = configuration;
            _env = env;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string selectQuery = @"SELECT * FROM Employee";
            string connectionString = configuration.GetConnectionString("EmployeeAppCon").ToString();
            DataTable tbl = new DataTable();
            SqlDataReader sqlDataReader;
            using (SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(selectQuery, conn))
                {
                    sqlDataReader = cmd.ExecuteReader();
                    tbl.Load(sqlDataReader);
                    conn.Close();
                }
            }
            return new JsonResult(tbl);
        }

        [HttpPost]
        public JsonResult Post(Employee employee)
        {
            string query = @"INSERT INTO Employee (Name, Department, DateOfJoined, PhotoName)
                VALUES('" + employee.Name + "', '" + employee.Department + "', '" + employee.DateOfJoined + "', '" + employee.PhotoName + "')";
            string connectString = configuration.GetConnectionString("EmployeeAppCon");
            using (SqlConnection conn = new SqlConnection(connectString))
            {
                conn.Open();
                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    int value = cmd.ExecuteNonQuery();
                    if (value <= 0)
                    {
                        return new JsonResult("Insert query dosen't execute in the database...!");
                    }
                    conn.Close();
                }
            }
            return new JsonResult("Record inserted...!");
        }

        [HttpPut]
        public JsonResult Put(Employee employee)
        {
            string query = @"UPDATE Employee SET Name = '" + employee.Name + @"'
                , Department = '" + employee.Department + @"' 
                , DateOfJoined = '" + employee.DateOfJoined + @"' 
                , PhotoName = '" + employee.PhotoName + @"' 
                  WHERE Id = '" + employee.Id + @"'";
            string connectionString = configuration.GetConnectionString("EmployeeAppCon");
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    int value = cmd.ExecuteNonQuery();
                    if (value <= 0)
                    {
                        return new JsonResult("Update dosen't execute in the database...!");
                    }
                    con.Close();
                }
            }
            return new JsonResult("Update executed in the database...!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM Employee WHERE Id = '" + id + "'";
            string conString = configuration.GetConnectionString("EmployeeAppCon");
            using (SqlConnection con = new SqlConnection(conString))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    int value = cmd.ExecuteNonQuery();
                    if (value <= 0)
                        return new JsonResult($"Sorry given department id {id} couldn't find in the database");
                }
            }
            return new JsonResult($"Employee id {id} has been deleted from the database");
        }

        [HttpPost]
        [Route("SaveFile")]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postFile = httpRequest.Files[0];
                var fileName = postFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Images/" + fileName;
                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {                   
                    postFile.CopyTo(stream);
                }
                return new JsonResult(fileName);
            }
            catch (Exception ex)
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
