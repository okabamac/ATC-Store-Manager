#!/bin/bash
database="monstersdb"
echo "Configuring database: $database"

echo $PATH
dropdb -U node_user monstersdb
createdb -U node_user monstersdb


psql -U node_user monstersdb < ./bin/sql/monster.sql

echo "$database configured"