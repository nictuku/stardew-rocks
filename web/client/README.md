# Usage
## Prerequisites
- Install [Nodejs](https://nodejs.org/en/)
- Install webpack globally
```
$ npm install -g webpack
```
- Install dependencies
```
$ npm install
```

## Building
- Install dependencies
```
$ npm install
```
- Minify and make bundle
```
$ webpack
```

## Running Locally
- Make sure you've gotten the dependencies
```
$ npm install
```
- Run the go server
```
$ go get ../server
$ go build ../server
$ go ../server/server
```
- Run the webpack-dev-server
```
$ npm start
```

## Testing
- Make sure you've gotten the dependencies
```
$ npm install
```
- Run the test running in watch mode
```
$ npm test
```

## Running tests once
- Install karma-cli globally
```
$ npm install -g karma-cli
```
- Run karma
```
$ karma start --single-run
```

# Required things for app to run
- index.html
- bundle.js
