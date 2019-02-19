#!/usr/bin/env bash
# git hook to run a command after `git pull` if a specified file was changed

changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
	echo "$changed_files" | grep -E --quiet "$1" && eval "$2"
}

# `composer install` if the `composer.lock` file gets changed
check_run composer.lock "composer install"

# `yarn install` if the `yarn.lock` file gets changed
check_run yarn.lock "yarn install"

# `npm install` if the `package-lock.json` file gets changed
check_run package-lock.json "npm install"
