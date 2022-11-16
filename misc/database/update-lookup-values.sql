SET IDENTITY_INSERT [Lookup] ON
GO

DECLARE @now DateTime2;
SELECT @now = GETUTCDATE();

DECLARE @me nvarchar(max);
SELECT @me = '(setup)';
MERGE INTO [Lookup] AS Target
USING (
	VALUES
(
		100, 
		'System.Lookup.Types', 
		'System.Lookup.Types',
		'Lookup Types',
		10, 
		'ACTIVE', 
		@me, @now, 
		@me, @now	
),

(
		200, 
		'System.Lookup.Types', 
		'System.Lookup.StatusValues',
		'Status Values',
		20, 
		'ACTIVE', 
		@me, @now, 
		@me, @now	
),

(
		11200, 
		'System.Lookup.StatusValues', 
		'Active',
		'Active',
		0, 
		'ACTIVE', 
		@me, @now, 
		@me, @now	
),

(
		11300, 
		'System.Lookup.StatusValues', 
		'Inactive',
		'Inactive',
		0, 
		'ACTIVE', 
		@me, @now, 
		@me, @now	
))

AS Source (Id, LookupType, LookupKey, LookupValue, DisplayOrder, Status, CreatedBy, CreatedDate, LastModifiedBy, LastModifiedDate)
ON Target.Id = Source.Id
WHEN MATCHED THEN UPDATE SET
	LookupType = Source.LookupType,
	LookupKey = Source.LookupKey,
	LookupValue = Source.LookupValue,
	DisplayOrder = Source.DisplayOrder,
	Status = Source.Status,
	CreatedBy = Source.CreatedBy,
	CreatedDate = Source.CreatedDate,
	LastModifiedBy = Source.LastModifiedBy,
	LastModifiedDate = Source.LastModifiedDate
WHEN NOT MATCHED BY TARGET THEN
	INSERT (Id, LookupType, LookupKey, LookupValue, DisplayOrder, Status, CreatedBy, CreatedDate, LastModifiedBy, LastModifiedDate)
	VALUES (Id, LookupType, LookupKey, LookupValue, DisplayOrder, Status, CreatedBy, CreatedDate, LastModifiedBy, LastModifiedDate)
WHEN NOT MATCHED BY SOURCE THEN 
	DELETE;
GO
