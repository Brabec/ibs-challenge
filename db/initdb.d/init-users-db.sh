#!/usr/bin/bash

set -e

psql -v
ON_ERROR_STOP=1 <<-EOSQL
CREATE USER admin;
CREATE DATABASE contacts ENCODING UTF8;
GRANT ALL PRIVILEGES ON DATABASE contacts TO admin;

ALTER USER admin WITH PASSWORD 'password123';
ALTER USER admin WITH SUPERUSER;
EOSQL