#!/bin/sh

npx --no-install jira-prepare-commit-msg $1

npx lint-staged