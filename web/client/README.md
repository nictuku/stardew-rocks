# How to build
## Prerequisites
- Install [Nodejs](https://nodejs.org/en/)
- Install Webpack
```
$ npm install -g webpack
```

## Building
- Change directory to where this README is
- Install dependencies
```
$ npm install
```
- Run webpack
```
$ webpack
```
- You should now have a /dist folder with a bundles.js

## Running Locally
- Install webpack-dev-server
```
$ npm install -g webpack-dev-server
```
- Run webpack-dev-server with hot reloading
```
$ webpack-dev-server --hot --inline
```
