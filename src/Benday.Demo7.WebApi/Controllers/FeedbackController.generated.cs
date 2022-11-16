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
    public partial class FeedbackController : ControllerBase
    {
        private readonly ILookupService _LookupService;
        private readonly IFeedbackService _Service;
        private readonly ILogger<FeedbackController> _Logger;
        
        public FeedbackController(
            ILogger<FeedbackController> logger,
            IFeedbackService service,
            ILookupService lookupService)
        {
            if (service == null)
                throw new ArgumentNullException(nameof(service), "service is null.");
            
            _Service = service;
            _LookupService = lookupService;
            _Logger = logger;
        }
        
        // GET: api/Feedback
        [HttpGet]
        public IEnumerable<Feedback> GetFeedbacks()
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
            var returnValue = new SimpleSearchResults<Feedback>();
            
            returnValue.SearchValue = simpleSearchValue;
            
            IList<Feedback> results;
            
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
            
            var pageableResults = new PageableResults<Feedback>();
            
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
        
        // GET: api/Feedback/5
        [HttpGet("{id}")]
        public IActionResult GetFeedback([FromRoute] int id)
        {
            var item = _Service.GetById(id);
            
            if (item == null)
            {
                return NotFound();
            }
            
            return Ok(item);
        }
        
        // PUT: api/Feedback/5
        [HttpPut("{id}")]
        public IActionResult PutFeedback([FromRoute] int id, [FromBody] Feedback item)
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
        
        // POST: api/Feedback
        [HttpPost]
        public IActionResult PostFeedback([FromBody] Feedback item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            _Service.Save(item);
            
            return CreatedAtAction("GetFeedback", new { id = item.Id }, item);
        }
        
        // DELETE: api/Feedback/5
        [HttpDelete("{id}")]
        public IActionResult DeleteFeedback([FromRoute] int id)
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