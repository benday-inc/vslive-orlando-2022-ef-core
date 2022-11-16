using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Benday.Demo7.Api;
using Benday.Demo7.Api.ServiceLayers;
using Benday.Demo7.Api.DomainModels;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Benday.Demo7.Api.Security;
using Benday.Common;

namespace Benday.Demo7.WebApi.Controllers
{
    [Authorize(Policy = SecurityConstants.Policy_IsAdministrator)]
    [Route("api/[controller]")]
    [ApiController]
    public partial class ConfigurationItemController : ControllerBase
    {
        private readonly ILookupService _LookupService;
        private readonly IConfigurationItemService _Service;
        private readonly ILogger<ConfigurationItemController> _Logger;
        
        public ConfigurationItemController(
            ILogger<ConfigurationItemController> logger,
            IConfigurationItemService service,
            ILookupService lookupService)
        {
            if (service == null)
                throw new ArgumentNullException(nameof(service), "service is null.");
            
            _Service = service;
            _LookupService = lookupService;
            _Logger = logger;
        }
        
        // GET: api/ConfigurationItem
        [HttpGet]
        public IEnumerable<ConfigurationItem> GetConfigurationItems()
        {
            return _Service.GetAll();
        }
        
        [HttpGet("simplesearch")]
        [HttpGet("simplesearch/{simpleSearchValue}")]
        public IActionResult SimpleSearch(
            [FromRoute] string simpleSearchValue = "",
            [FromQuery] string pageNumber = null,
            [FromQuery] string sortBy = null,
            [FromQuery] string sortDirection = null,
            [FromQuery] int maxNumberOfResults = 100)
        {
            var returnValue = new SimpleSearchResults<ConfigurationItem>();
            
            returnValue.SearchValue = simpleSearchValue;
            
            IList<ConfigurationItem> results;
            
            if (string.IsNullOrEmpty(sortBy) == true)
            {
                results = _Service.SimpleSearch(simpleSearchValue);
                
                returnValue.CurrentSortDirection = SearchConstants.SortDirectionAscending;
                returnValue.CurrentSortProperty = string.Empty;
            }
            else
            {
                returnValue.CurrentSortDirection = GetSortDirection(sortDirection);
                returnValue.CurrentSortProperty = sortBy;
                
                results =
                    _Service.SimpleSearch(simpleSearchValue, sortBy,
                    returnValue.CurrentSortDirection, maxNumberOfResults);
            }
            
            var pageableResults = new PageableResults<ConfigurationItem>();
            
            pageableResults.Initialize(results);
            
            pageableResults.CurrentPage = pageNumber.SafeToInt32(0);
            
            returnValue.CurrentPageValues = pageableResults.PageValues;
            returnValue.ItemsPerPage = pageableResults.ItemsPerPage;
            returnValue.PageCount = pageableResults.PageCount;
            returnValue.TotalCount = pageableResults.TotalCount;
            
            return Ok(returnValue);
        }
        
        private string GetSortDirection(string sortDirection)
        {
            if (string.IsNullOrWhiteSpace(sortDirection) == true)
            {
                return SearchConstants.SortDirectionAscending;
            }
            else
            {
                if (string.Compare(sortDirection, SearchConstants.SortDirectionDescending, true) == 0)
                {
                    return SearchConstants.SortDirectionDescending;
                }
                else
                {
                    return SearchConstants.SortDirectionAscending;
                }
            }
        }
        
        // GET: api/ConfigurationItem/5
        [HttpGet("{id}")]
        public IActionResult GetConfigurationItem([FromRoute] int id)
        {
            var item = _Service.GetById(id);
            
            if (item == null)
            {
                return NotFound();
            }
            
            return Ok(item);
        }
        
        // PUT: api/ConfigurationItem/5
        [HttpPut("{id}")]
        public IActionResult PutConfigurationItem([FromRoute] int id, [FromBody] ConfigurationItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (id != item.Id)
            {
                return BadRequest();
            }
            
            _Service.Save(item);
            
            return NoContent();
        }
        
        // POST: api/ConfigurationItem
        [HttpPost]
        public IActionResult PostConfigurationItem([FromBody] ConfigurationItem item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _Service.Save(item);
            
            return CreatedAtAction("GetConfigurationItem", new { id = item.Id }, item);
        }
        
        // DELETE: api/ConfigurationItem/5
        [HttpDelete("{id}")]
        public IActionResult DeleteConfigurationItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var item = _Service.GetById(id);
            
            if (item == null)
            {
                return NotFound();
            }
            
            _Service.DeleteById(id);
            
            return Ok(item);
        }
    }
}