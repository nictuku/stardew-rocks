# Usage
## Prerequisites
- Install [Nodejs](https://nodejs.org/en/)
- Install jspm
```
$ npm install -g jspm
```

## Building
- Install project's jspm packages (do this every pull)
```
$ jspm install
```

Currently we aren't building a bundle, but in the future we could if we need slightly better performance.

# Running Locally
## Prerequisites
- Install live-server
```
$ npm install -g live-server
```

## Running
- Make sure you've gotten the dependencies
```
$ jspm install
```
- Run live-server in web/client (where this readme is)
```
$ live-server --entry-file="index.html"
```

# Required things for app to run
- index.html
- app/
- jspm_packages/
- config.js
- main.js
