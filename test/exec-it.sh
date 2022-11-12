#!/bin/sh
set -x

INCLUDE=""
if [ ! -z "${1}" ]; then
  INCLUDE="--include ${1}"
fi

robot --outputdir reports/integration ${INCLUDE} --exclude Skip ./it/suites/