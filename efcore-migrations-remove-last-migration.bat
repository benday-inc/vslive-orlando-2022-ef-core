set base=%cd%
cd src\Benday.Demo7.Api

dotnet ef migrations remove

cd %base%