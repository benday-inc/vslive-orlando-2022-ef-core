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
using Benday.Common;

namespace Benday.Demo7.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public partial class PersonController : ControllerBase
    {
        private readonly ILookupService _LookupService;
        private readonly IPersonService _Service;
        private readonly ILogger<PersonController> _Logger;
        
        public PersonController(
            ILogger<PersonController> logger,
            IPersonService service,
            ILookupService lookupService)
        {
            if (service == null)
                throw new ArgumentNullException(nameof(service), "service is null.");
            
            _Service = service;
            _LookupService = lookupService;
            _Logger = logger;
        }
        
        // GET: api/Person
        [HttpGet]
        public IEnumerable<Person> GetPersons()
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
            var returnValue = new SimpleSearchResults<Person>();
            
            returnValue.SearchValue = simpleSearchValue;
            
            IList<Person> results;
            
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
            
            var pageableResults = new PageableResults<Person>();
            
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
        
        // GET: api/Person/5
        [HttpGet("{id}")]
        public IActionResult GetPerson([FromRoute] int id)
        {
            var item = _Service.GetById(id);
            
            if (item == null)
            {
                return NotFound();
            }
            
            return Ok(item);
        }
        
        // PUT: api/Person/5
        [HttpPut("{id}")]
        public IActionResult PutPerson([FromRoute] int id, [FromBody] Person item)
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
        
        // POST: api/Person
        [HttpPost]
        public IActionResult PostPerson([FromBody] Person item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _Service.Save(item);
            
            return CreatedAtAction("GetPerson", new { id = item.Id }, item);
        }
        
        // DELETE: api/Person/5
        [HttpDelete("{id}")]
        public IActionResult DeletePerson([FromRoute] int id)
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