#!/bin/bash
BASEDIR=$(dirname $0)
DATABASE=${DATABASE_NAME}
psql -U postgres -v "DATABASE_NAME=$DATABASE_NAME" -v "DATABASE_OWNER=$DATABASE_OWNER" -v "DATABASE_USER=$DATABASE_USER" -v "DATABASE_PASSWORD=$DATABASE_PASSWORD" -f "$BASEDIR/dropdb.sql" &&
createdb -U postgres $DATABASE &&
psql -U postgres -d $DATABASE_NAME -f "$BASEDIR/schema.sql" &&
psql -U postgres -d $DATABASE_NAME -v "DATABASE_NAME=$DATABASE_NAME" -v "DATABASE_OWNER=$DATABASE_OWNER" -v "DATABASE_USER=$DATABASE_USER" -v "DATABASE_PASSWORD='$DATABASE_PASSWORD'" -f "$BASEDIR/user.sql" &&
psql -U postgres -d $DATABASE_NAME -f "$BASEDIR/initial-data.sql"