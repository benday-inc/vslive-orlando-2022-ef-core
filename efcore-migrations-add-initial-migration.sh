#!/bin/bash

base="$PWD"

cd src/Benday.Demo7.Api

dotnet ef migrations add InitialSetup

cd $base