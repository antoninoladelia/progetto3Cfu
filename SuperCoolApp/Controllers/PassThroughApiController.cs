using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace SuperCoolApp.Controllers
{
    [Route("api/")]
    public class PassThroughApiController : Controller
    {
        private const string baseAddress = "http://localhost:5000/api/";
        static HttpClient http = new HttpClient(new HttpClientHandler { UseCookies = false, });
        
        /// <summary>
        /// Gets the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpGet("{*any}")]
        public Task<IActionResult> Get()
        {
            return SendAsync(HttpMethod.Get);
        }

        /// <summary>
        /// Posts the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpPost("{*any}")]
        public Task<IActionResult> Post()
        {
            return SendAsync(HttpMethod.Post);
        }

        /// <summary>
        /// Puts the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpPut("{*any}")]
        public Task<IActionResult> Put()
        {

            
            return SendAsync(HttpMethod.Put);
        }

        /// <summary>
        /// Deletes the specified URL.
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{*any}")]
        public Task<IActionResult> Delete()
        {
            return SendAsync(HttpMethod.Delete);
        }

        private async Task<IActionResult> SendAsync(HttpMethod method)
        {
            HttpClient client = new HttpClient();
            try
            {
                //var serviceApiUri = new Uri(baseAddress);

                string path = Request.Path.Value.Replace("/api/", "");
                string pathAndQuery = path + Request.QueryString;
                var uri = new Uri(baseAddress+pathAndQuery);
              
                HttpRequestMessage request = new HttpRequestMessage(method, uri);

                //copy original headers
                foreach(var header in Request.Headers)
                {
                    request.Headers.Add(header.Key, header.Value.ToArray());

                }
                //copy content
                if (method == HttpMethod.Put || method == HttpMethod.Post)
                {

                    var json = JsonConvert.SerializeObject(Request.Body);
                    var content = new System.Net.Http.StringContent(json, Encoding.UTF8, "application/json");
                    request.Content = content;



                    // request.Content = Request.Body;        

                }

                var httpResponse = await http.SendAsync(request);
                if(httpResponse.IsSuccessStatusCode)
                {
                    var responseData = await httpResponse.Content.ReadAsStringAsync();
                    return Ok(Newtonsoft.Json.JsonConvert.DeserializeObject(responseData));
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, httpResponse.ReasonPhrase);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
