# express-react-starter
A starter project that sets things up the way I like it.

Updated to use ApolloJS

## What is included

* ExpressJS
* Mongoose/MongoDB
* Docker and docker-compose setup files
* React with common plugins
* Typescript support
* Eslint
* Prettier
* ApolloJS/GraphQL

## How to use

Copy the `.env.example` file and modify it as necessary

Run `docker-compose up`

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