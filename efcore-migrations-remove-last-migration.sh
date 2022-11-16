#!/bin/bash

base="$PWD"

cd src/Benday.Demo7.Api

dotnet ef migrations remove

cd $base