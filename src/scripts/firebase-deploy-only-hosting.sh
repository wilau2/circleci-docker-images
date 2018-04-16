#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

FIREBASE_APP=$1
FIREBASE_APP_TOKEN=$2

firebase use ${FIREBASE_APP} --token ${FIREBASE_APP_TOKEN} --non-interactive
firebase deploy --only hosting --token ${FIREBASE_APP_TOKEN} --non-interactive