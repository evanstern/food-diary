# food-diary 

Track your food and see your calories

[see it in action](https://food-diary.machineservant-apps.com)

## What is included

* ExpressJS
* Mongoose/MongoDB
* Docker and docker-compose setup files
* React with common plugins
* Typescript support
* Eslint
* Prettier
* ApolloJS/GraphQL

## Development Steps 

Create an Auth0 application (you'll need the CLIENT_ID and DOMAIN for the steps below)

Copy the `.env.example` file and modify it as necessary.

Edit the `./client/.env.development` environment file as necessary.

Run `docker-compose up`

## Production

Currently this application is deployed using [dokku](http://dokku.viewdocs.io/dokku/).

It is hosted on DigitalOcean.

### Provisioning the target machine 

#### SSH into production host

```
$ ssh root@<domain>
```

#### Create swap file

```
# There may be some issues with permissions, just set the permissons as
# necessary (and possibly `swapoff /swapfile` before doing so)
dd if=/dev/zero of=/swapfile bs=1024 count=1024000
mkswap /swapfile
swapon /swapfile
```

#### Create app in dokku

```
$ dokku apps:create <app_name>
```

#### Set up all environment variables

```
$ dokku config:set <app_name> VAR=value
```

#### Map port 80 to 8000

```
$ dokku proxy:ports-add <app_name> http:80:8000
```

#### Install letsencrypt plugin

```
$ dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git
```

#### Setup letsencrypt

```
$ dokku config:set --no-restart <app_name> DOKKU_LETSENCRYPT_EMAIL=<your_email>
$ dokku letsencrypt <app_name>
```

### Releasing new code

```
$ git remote add dokku dokku@<hostname>:<app_name>
$ git push dokku master
```

## TODO

* Remove `'./client/.env` file and use env vars on target machine

## Tips

### VSCode eslint highlighting

There are two folders with different eslint configurations. In order to
enable highlighting for the `client` and `/src` folders you need to specify
the working directories in your `settings.json` file.

```
  "eslint.workingDirectories": [
    "./client", "./src"
  ]
```