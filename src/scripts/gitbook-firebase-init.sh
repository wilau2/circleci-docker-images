#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

HOSTING_PUBLIC=$1
FIREBASE_PROJECT_NAME=$2

jq -n '{"hosting": {"public": "${HOSTING_PUBLIC}"}}' > firebase.json
jq -n '{"projects": {"gitbook": "${FIREBASE_PROJECT_NAME}"}}' > .firebaserc