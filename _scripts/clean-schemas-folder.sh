#!/usr/bin/env sh

CWD="$(dirname "$0")"
cd "$CWD/../"
BASE_PATH=$(pwd)

if [ ! -d tmp-graphql ]
then
  echo "Create schemas folder"
  mkdir -p tmp-graphql
else
  echo "Clean schemas folder"
  rm -Rf tmp-graphql/*
  find hosts/staff-portal/src/ -name "*.types.tsx" -type f -delete
  find namespaces -name "*.gql.types.tsx" -type f -delete
  find libs -name "*.gql.types.tsx" -type f -delete
fi
