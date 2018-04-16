#!/usr/bin/env bash


jq -n '{"hosting": {"public": "docs/_book"}}' > firebase.json
jq -n '{"projects": {"gitbook": "harvest-balance-calculator"}}' > .firebaserc