#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

HOSTING_PUBLIC=$1
FIREBASE_PROJECT_NAME=$2

jq -n --arg HOSTING_PUBLIC "${HOSTING_PUBLIC}" '{"hosting": {"public": "\($HOSTING_PUBLIC)"}}' > firebase.json
jq -n --arg FIREBASE_PROJECT_NAME "${FIREBASE_PROJECT_NAME}" '{"projects": {"gitbook": "\($FIREBASE_PROJECT_NAME)"}}' > .firebaserc