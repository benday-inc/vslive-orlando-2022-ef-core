declare @username nvarchar(max)

select @username = N'demo7user'

if not exists (select * from sys.sql_logins where [name] = @username)
BEGIN
	CREATE LOGIN [demo7user] 
	WITH PASSWORD = 'Pa$$word' 
END

