#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

PATH=$1

/usr/local/bin/nodejs /usr/local/lib/node_modules/gitbook-cli/bin/gitbook.js build ${PATH}