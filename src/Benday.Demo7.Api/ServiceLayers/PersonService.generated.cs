using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Benday.Demo7.Api.Adapters;
using Benday.Demo7.Api.DomainModels;
using Benday.Demo7.Api.DataAccess.Entities;
using Benday.Demo7.Api.DataAccess.SqlServer;
using Benday.EfCore.SqlServer;
using Benday.Common;

namespace Benday.Demo7.Api.ServiceLayers
{
    public partial class PersonService :
        CoreFieldsServiceLayerBase<Benday.Demo7.Api.DomainModels.Person>,
        IPersonService
    {
        private IPersonRepository _Repository;
        private PersonAdapter _Adapter;
        private IValidatorStrategy<Benday.Demo7.Api.DomainModels.Person> _ValidatorInstance;
        private ISearchStringParserStrategy _SearchStringParser;
        
        public PersonService(
            IPersonRepository repository,
            IValidatorStrategy<Benday.Demo7.Api.DomainModels.Person> validator,
            IUsernameProvider usernameProvider, ISearchStringParserStrategy searchStringParser) :
            base(usernameProvider)
        {
            _Repository = repository;
            _ValidatorInstance = validator;
            _SearchStringParser = searchStringParser;
            
            _Adapter = new PersonAdapter();
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> GetAll(
            int maxNumberOfResults = 100)
        {
            var entityResults = _Repository.GetAll(maxNumberOfResults);
            
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Person>();
            
            _Adapter.Adapt(entityResults, returnValues);
            
            BeforeReturnFromGet(returnValues);
            
            return returnValues;
        }
        
        public Benday.Demo7.Api.DomainModels.Person GetById(int id)
        {
            var entityResults = _Repository.GetById(id);
            
            if (entityResults == null)
            {
                return null;
            }
            else
            {
                var returnValue = new Benday.Demo7.Api.DomainModels.Person();
                
                _Adapter.Adapt(entityResults, returnValue);
                
                BeforeReturnFromGet(returnValue);
                
                return returnValue;
            }
        }
        
        public void Save(Benday.Demo7.Api.DomainModels.Person saveThis)
        {
            if (saveThis == null)
                throw new ArgumentNullException("saveThis", "saveThis is null.");
            
            if (_ValidatorInstance.IsValid(saveThis) == false)
            {
                ApiUtilities.ThrowValidationException("Item is invalid.");
            }
            else
            {
                Benday.Demo7.Api.DataAccess.Entities.PersonEntity toValue;
                
                if (saveThis.Id == 0)
                {
                    toValue = new Benday.Demo7.Api.DataAccess.Entities.PersonEntity();
                }
                else
                {
                    toValue = _Repository.GetById(saveThis.Id);
                    
                    if (toValue == null)
                    {
                        ApiUtilities.ThrowUnknownObjectException("Person", saveThis.Id);
                    }
                }
                
                PopulateAuditFieldsBeforeSave(saveThis);
                
                
                
                _Adapter.Adapt(saveThis, toValue);
                
                _Repository.Save(toValue);
                
                PopulateFieldsFromEntityAfterSave(toValue, saveThis);
            }
        }
        
        public void DeleteById(int id)
        {
            var match = _Repository.GetById(id);
            
            if (match == null)
            {
                throw new InvalidOperationException(
                    $"Could not locate an item with an id of '{id}'."
                    );
            }
            else
            {
                _Repository.Delete(match);
            }
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> SimpleSearch(
            string searchValue,
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100)
        {
            Search search = GetSimpleSearch(searchValue, maxNumberOfResults);
            
            if (sortBy != null)
            {
                search.AddSort(sortBy, sortByDirection);
            }
            
            return Search(search);
        }
        
        private Search GetSimpleSearch(string searchValue, int maxNumberOfResults)
        {
            var search = new Search();
            
            search.MaxNumberOfResults = maxNumberOfResults;
            
            var searchTokens = _SearchStringParser.Parse(searchValue);
            
            foreach (var searchToken in searchTokens)
            {
                AddSimpleSearchForValue(search, searchToken);
            }
            
            return search;
        }
        
        private void AddSimpleSearchForValue(Search search, string searchValue)
        {
            search.AddArgument(
                "FirstName", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "LastName", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "EmailAddress", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "Status", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "CreatedBy", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "LastModifiedBy", SearchMethod.Contains, searchValue, SearchOperator.Or);
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> Search(
            SearchMethod searchTypeFirstName = SearchMethod.Contains,
            string searchValueFirstName = null,
            SearchMethod searchTypeLastName = SearchMethod.Contains,
            string searchValueLastName = null,
            SearchMethod searchTypeEmailAddress = SearchMethod.Contains,
            string searchValueEmailAddress = null,
            SearchMethod searchTypeId = SearchMethod.Skip,
            int searchValueId = 0,
            SearchMethod searchTypeStatus = SearchMethod.Contains,
            string searchValueStatus = null,
            SearchMethod searchTypeCreatedBy = SearchMethod.Contains,
            string searchValueCreatedBy = null,
            SearchMethod searchTypeLastModifiedBy = SearchMethod.Contains,
            string searchValueLastModifiedBy = null,
            
            
            string sortBy = null,
            string sortByDirection = null,
            int maxNumberOfResults = 100)
        {
            var search = new Search();
            
            if (sortBy != null)
            {
                search.AddSort(sortBy, sortByDirection);
            }
            
            bool foundOneNonNullSearchValue = false;
            
            if (string.IsNullOrWhiteSpace(searchValueFirstName) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "FirstName", searchTypeFirstName, searchValueFirstName);
            }
            if (string.IsNullOrWhiteSpace(searchValueLastName) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "LastName", searchTypeLastName, searchValueLastName);
            }
            if (string.IsNullOrWhiteSpace(searchValueEmailAddress) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "EmailAddress", searchTypeEmailAddress, searchValueEmailAddress);
            }
            if (searchTypeId == SearchMethod.Equals)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "Id", searchTypeId, searchValueId);
            }
            if (string.IsNullOrWhiteSpace(searchValueStatus) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "Status", searchTypeStatus, searchValueStatus);
            }
            if (string.IsNullOrWhiteSpace(searchValueCreatedBy) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "CreatedBy", searchTypeCreatedBy, searchValueCreatedBy);
            }
            if (string.IsNullOrWhiteSpace(searchValueLastModifiedBy) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "LastModifiedBy", searchTypeLastModifiedBy, searchValueLastModifiedBy);
            }
            
            
            
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Person>();
            
            if (foundOneNonNullSearchValue == true)
            {
                search.MaxNumberOfResults = maxNumberOfResults;
                
                var results = _Repository.Search(search);
                var entityResults = results.Results;
                
                _Adapter.Adapt(entityResults, returnValues);
            }
            
            return returnValues;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Person> Search(Search search)
        {
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Person>();
            
            if (search == null ||
                search.Arguments == null ||
                search.MaxNumberOfResults == 0)
            {
                return returnValues;
            }
            else
            {
                var results = _Repository.Search(search);
                var entityResults = results.Results;
                
                _Adapter.Adapt(entityResults, returnValues);
            }
            
            return returnValues;
        }
    }
}