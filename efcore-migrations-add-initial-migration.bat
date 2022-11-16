set base=%cd%
cd src\Benday.Demo7.Api

dotnet ef migrations add InitialSetup

cd %base%