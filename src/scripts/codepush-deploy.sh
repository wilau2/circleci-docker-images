#!/usr/bin/env bash
set -o errexit
set -o nounset

# set -o xtrace
# set -o pipefail

TELEMETRY_STATUS=$1
CODE_PUSH_TOKEN=$2
OWNER_NAME=$3
APP_NAME=$4
DEPLOYMENT_NAME=$5
TARGET_VERSION=$6

sudo appcenter telemetry ${TELEMETRY_STATUS}
sudo cordova telemetry ${TELEMETRY_STATUS}
sudo appcenter login --token ${CODE_PUSH_TOKEN}
sudo appcenter codepush release-cordova --disable-telemetry --quiet -a ${OWNER_NAME}/${APP_NAME} -d ${DEPLOYMENT_NAME} -t ${TARGET_VERSION}
