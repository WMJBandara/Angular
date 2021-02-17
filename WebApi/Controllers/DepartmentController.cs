using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private IConfiguration configuration;

        public DepartmentController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string selectQuery = @"SELECT * FROM Department";
            string connectionString = configuration.GetConnectionString("EmployeeAppCon").ToString();
            DataTable tbl = new DataTable();
            SqlDataReader sqlDataReader;
            using(SqlConnection conn = new SqlConnection(connectionString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand(selectQuery, conn))
                {
                    sqlDataReader = cmd.ExecuteReader();
                    tbl.Load(sqlDataReader);
                    conn.Close();
                }
            }
            return new JsonResult(tbl);
        }

        [HttpPost]
        public JsonResult Post(Department department)
        {
            string query = @"INSERT INTO Department VALUES
                ('" + department.Name + "')";
            string connectString = configuration.GetConnectionString("EmployeeAppCon");
            using(SqlConnection conn = new SqlConnection(connectString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand(query, conn))
                {
                    cmd.ExecuteReader();
                    conn.Close();
                }
            }
            return new JsonResult("Record inserted...!");
        }

        [HttpGet]
        [Route("GetAllDepartmentNames")]
        public JsonResult GetAllDepartmentNames()
        {
            string query = @"SELECT Name FROM Department";
            string conString = configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader dataReader;
            DataTable table = new DataTable();
            using(SqlConnection conn = new SqlConnection(conString))
            {
                conn.Open();
                using(SqlCommand cmd = new SqlCommand(query, conn))
                {
                    dataReader = cmd.ExecuteReader();
                    table.Load(dataReader);
                    conn.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPut]
        public JsonResult Put(Department department)
        {
            string query = @"UPDATE Department SET Name = '" + department.Name + "' WHERE Id = '" + department.Id + "'";
            string connectionString = configuration.GetConnectionString("EmployeeAppCon");
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                using(SqlCommand cmd = new SqlCommand(query, con))
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
            string query = @"DELETE FROM Department WHERE Id = '" + id + "'";
            string conString = configuration.GetConnectionString("EmployeeAppCon");
            using(SqlConnection con = new SqlConnection(conString))
            {
                con.Open();
                using(SqlCommand cmd = new SqlCommand(query, con))
                {
                    int value = cmd.ExecuteNonQuery();
                    if (value <= 0)
                        return new JsonResult($"Sorry given department id {id} couldn't find in the database");
                }
            }
            return new JsonResult($"Department id {id} has been deleted from the database");
        }
    }
}
