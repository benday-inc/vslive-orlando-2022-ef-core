#!/bin/bash

servername="127.0.0.1"
databasename="Demo7"
username="sa"
userPassword="Pa\$\$word"
sqlCommandPrefix="./set-nocount.sql,"

while getopts s:d:u:p: flag
do
    case "${flag}" in
        s) servername=${OPTARG};;
        d) databasename=${OPTARG};;
        u) username=${OPTARG};;
        p) userPassword=${OPTARG};;
    esac
done

echo "***** DATABASE CREDENTIALS *****";
echo "Server name: $servername";
echo "Database name: $databasename";
echo "User name: $username";
echo "Password: $userPassword";
echo "*****";

sqlcmd -S $servername -i $sqlCommandPrefix./create-database-logins.sql -d master -U $username -P $userPassword
sqlcmd -S $servername -i $sqlCommandPrefix./create-database-users.sql -d $databasename -U $username -P $userPassword
