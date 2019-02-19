# Craft3-base App

## Install this Craft3-base App

Before you start, you must have the latest version of the following software installed globally :

- apache or nginx
- mariadb
- php
- git
- composer
- node
- npm
- yarn
- gulp-cli

NOTE: The `public` folder must be set as your document root.

NOTE: If you're running this project with `nginx`, use this config [https://github.com/nystudio107/nginx-craft]

- Replace every instance of `REPLACE_ME` in this file with your project's name and delete this line
- Create a SQL database named `REPLACE_ME` using the `utf8_unicode_ci` collation.
- Run this command `composer install && npm install && ./craft setup && ./byhoffman-setup && rm .env && gulp generate && gulp serve`
- Replace every instance of `REPLACE_ME` in the `.env.sh.example` file and delete this line
- Replace every instance of `[PWD]` and `[USER]` in the `.env.sh.example` file with the correct information and delete this line
- Replace every instance of `REPLACE_ME` in the `package.json` file and delete this line
- Replace every instance of `REPLACE_ME` in the `public/webappmanifest.json` file and delete this line
- Make sure your 'BASE_PATH' in the `.env.php` file is `realpath(dirname(__FILE__)) . '/public/'`
- Also make sure to replace your .git/ repo in this project if you have 'cloned' the base. (craft3-base)
- Run this command `./scripts/pull_db.sh && ./scripts/pull_assets.sh`

## Local development with Laravel Valet (craft3-base.test)

- Access your local website with `REPLACE_ME.test`
- You need to have this Laravel Valet driver installed [https://bitbucket.org/hoffmanagency/craft-valet] if you use
Laravel Valet version 1.x.x.
- If you don't use `valet park`, create a link using `valet link craft3-base` to access your site with `REPLACE_ME.test`.
- Only run `gulp build` when you want to generate Critical CSS for production. Otherwise, gulp build is reserved for Production only.

## Updating this project

####  Sync local dev assets from the live pro­duc­tion/staging serv­er
- If you are supporting a production/staging website and want to sync the assets from the Master Version :
- Configure your `.env.sh` file
- CD into the scripts folder `cd scripts`
- Import assets using `./pull_assets.sh`

#### Sync local dev data­base from the live pro­duc­tion/staging serv­er
- If you are supporting a production/staging website and want to sync the Database from the Master Version :
- Configure your `.env.sh` file
- CD into the scripts folder `cd scripts`
- Import Database using `./pull_db.sh`

#### Craft core updates

Only update Craft CMS in your **local development environment** using the latest production database dump and commit
all changes to files in the git repository. Never execute a Craft update directly on the production. Same goes for plugins.

## Craft control panel

- Local: `/admin`
- Staging: `/admin`
- Production: `/admin87654321`

**Authentication**

- Username: Administrator
- Password: admin123

## Gulp Tasks

#### Serve
- `gulp serve` Build and watch for files changes, uses LiveReload.

#### Build
- `gulp build` Build all website assets, based on the current environment

#### See more commands/concepts in the `docs/` folder.

