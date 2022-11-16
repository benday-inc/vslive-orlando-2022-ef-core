declare @username nvarchar(max)

select @username = N'demo7user'

if not exists (SELECT * FROM [sys].[database_principals] where [name] = @username)
BEGIN
	CREATE USER demo7user
		FOR LOGIN demo7user
		WITH DEFAULT_SCHEMA = dbo

	EXEC sp_addrolemember N'db_datareader', N'demo7user'

	EXEC sp_addrolemember N'db_datawriter', N'demo7user'
END
ELSE
BEGIN
	EXEC sp_addrolemember N'db_datareader', N'demo7user'

	EXEC sp_addrolemember N'db_datawriter', N'demo7user'
END