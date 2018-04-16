#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

PATH=$1

gitbook build ${PATH}