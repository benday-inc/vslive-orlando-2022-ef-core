@ECHO OFF

set base=%cd%
cd src\Benday.Demo7.Api

IF "%1" == "" (
dotnet ef database update
) ELSE (
dotnet ef database update %1
)

cd %base%