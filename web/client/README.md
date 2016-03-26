# Usage
## Prerequisites
- Install [Nodejs](https://nodejs.org/en/)
- Install non-jspm dev dependencies
```
$ npm install
```
- Install jspm 0.17 beta
```
$ npm install -g jspm@beta
```

## Building
- Install project's jspm packages (do this every pull)
```
$ jspm install
```
- Minify and make bundle
```
$ jspm bundle src/main.js -m
```

# Running Locally
- Make sure you've gotten the dependencies
```
$ jspm install
```
- Run the go server
```
$ go get ../server
$ go build ../server
$ go ../server/server
```

# Required things for app to run
- index.html
- src/
- jspm_packages/
- jspm.config.js
- jspm.browser.js
