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
    public partial class LookupService :
        CoreFieldsServiceLayerBase<Benday.Demo7.Api.DomainModels.Lookup>,
        ILookupService
    {
        private ILookupRepository _Repository;
        private LookupAdapter _Adapter;
        private IValidatorStrategy<Benday.Demo7.Api.DomainModels.Lookup> _ValidatorInstance;
        private ISearchStringParserStrategy _SearchStringParser;
        
        public LookupService(
            ILookupRepository repository,
            IValidatorStrategy<Benday.Demo7.Api.DomainModels.Lookup> validator,
            IUsernameProvider usernameProvider, ISearchStringParserStrategy searchStringParser) :
            base(usernameProvider)
        {
            _Repository = repository;
            _ValidatorInstance = validator;
            _SearchStringParser = searchStringParser;
            
            _Adapter = new LookupAdapter();
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> GetAll(
            int maxNumberOfResults = 100)
        {
            var entityResults = _Repository.GetAll(maxNumberOfResults);
            
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Lookup>();
            
            _Adapter.Adapt(entityResults, returnValues);
            
            BeforeReturnFromGet(returnValues);
            
            return returnValues;
        }
        
        public Benday.Demo7.Api.DomainModels.Lookup GetById(int id)
        {
            var entityResults = _Repository.GetById(id);
            
            if (entityResults == null)
            {
                return null;
            }
            else
            {
                var returnValue = new Benday.Demo7.Api.DomainModels.Lookup();
                
                _Adapter.Adapt(entityResults, returnValue);
                
                BeforeReturnFromGet(returnValue);
                
                return returnValue;
            }
        }
        
        public void Save(Benday.Demo7.Api.DomainModels.Lookup saveThis)
        {
            if (saveThis == null)
                throw new ArgumentNullException("saveThis", "saveThis is null.");
            
            if (_ValidatorInstance.IsValid(saveThis) == false)
            {
                ApiUtilities.ThrowValidationException("Item is invalid.");
            }
            else
            {
                Benday.Demo7.Api.DataAccess.Entities.LookupEntity toValue;
                
                if (saveThis.Id == 0)
                {
                    toValue = new Benday.Demo7.Api.DataAccess.Entities.LookupEntity();
                }
                else
                {
                    toValue = _Repository.GetById(saveThis.Id);
                    
                    if (toValue == null)
                    {
                        ApiUtilities.ThrowUnknownObjectException("Lookup", saveThis.Id);
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
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> SimpleSearch(
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
                "LookupType", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "LookupKey", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "LookupValue", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "Status", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "CreatedBy", SearchMethod.Contains, searchValue, SearchOperator.Or);
            search.AddArgument(
                "LastModifiedBy", SearchMethod.Contains, searchValue, SearchOperator.Or);
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> Search(
            SearchMethod searchTypeDisplayOrder = SearchMethod.Skip,
            int searchValueDisplayOrder = 0,
            SearchMethod searchTypeLookupType = SearchMethod.Contains,
            string searchValueLookupType = null,
            SearchMethod searchTypeLookupKey = SearchMethod.Contains,
            string searchValueLookupKey = null,
            SearchMethod searchTypeLookupValue = SearchMethod.Contains,
            string searchValueLookupValue = null,
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
            
            if (searchTypeDisplayOrder == SearchMethod.Equals)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "DisplayOrder", searchTypeDisplayOrder, searchValueDisplayOrder);
            }
            if (string.IsNullOrWhiteSpace(searchValueLookupType) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "LookupType", searchTypeLookupType, searchValueLookupType);
            }
            if (string.IsNullOrWhiteSpace(searchValueLookupKey) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "LookupKey", searchTypeLookupKey, searchValueLookupKey);
            }
            if (string.IsNullOrWhiteSpace(searchValueLookupValue) == false)
            {
                foundOneNonNullSearchValue = true;
                search.AddArgument(
                    "LookupValue", searchTypeLookupValue, searchValueLookupValue);
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
            
            
            
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Lookup>();
            
            if (foundOneNonNullSearchValue == true)
            {
                search.MaxNumberOfResults = maxNumberOfResults;
                
                var results = _Repository.Search(search);
                var entityResults = results.Results;
                
                _Adapter.Adapt(entityResults, returnValues);
            }
            
            return returnValues;
        }
        
        public IList<Benday.Demo7.Api.DomainModels.Lookup> Search(Search search)
        {
            var returnValues = new List<Benday.Demo7.Api.DomainModels.Lookup>();
            
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
        
        public IList<Lookup> GetAllByType(string lookupType)
        {
            var entityResults = _Repository.GetAllByType(lookupType);
            
            var returnValues = new List<Lookup>();
            
            _Adapter.Adapt(entityResults, returnValues);
            
            return returnValues;
        }
    }
}