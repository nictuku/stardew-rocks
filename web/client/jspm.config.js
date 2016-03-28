SystemJS.config({
  transpiler: "plugin-babel",
  packages: {
    "stardew-rocks-web-client": {
      "main": "main.js",
      "format": "esm",
      "meta": {
        "*.js": {
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babel-plugin-transform-decorators-legacy": "npm:babel-plugin-transform-decorators-legacy@1.3.4",
    "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.7.4",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "chokidar": "npm:chokidar@1.4.3",
    "clean-css": "npm:clean-css@3.4.10",
    "color": "npm:color@0.11.1",
    "constants": "github:jspm/nodelibs-constants@0.2.0-alpha",
    "core-js": "npm:core-js@1.2.6",
    "crypto": "github:jspm/nodelibs-crypto@0.2.0-alpha",
    "css": "github:systemjs/plugin-css@0.1.20",
    "dgram": "github:jspm/nodelibs-dgram@0.2.0-alpha",
    "dns": "github:jspm/nodelibs-dns@0.2.0-alpha",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "font-awesome": "npm:font-awesome@4.5.0",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "fsevents": "npm:fsevents@1.0.9",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
    "jodid25519": "npm:jodid25519@1.0.2",
    "jsbn": "npm:jsbn@0.1.0",
    "lodash": "npm:lodash@4.6.1",
    "material-ui": "npm:material-ui@0.15.0-alpha.2",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "moment": "npm:moment@2.12.0",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "punycode": "github:jspm/nodelibs-punycode@0.2.0-alpha",
    "querystring": "github:jspm/nodelibs-querystring@0.2.0-alpha",
    "radium": "npm:radium@0.17.0",
    "react": "npm:react@0.14.7",
    "react-dom": "npm:react-dom@0.14.7",
    "react-ga": "npm:react-ga@1.2.1",
    "react-image-lightbox": "npm:react-image-lightbox@1.1.1",
    "react-redux": "npm:react-redux@4.4.1",
    "react-router": "npm:react-router@2.0.1",
    "react-sidebar": "npm:react-sidebar@2.1.1",
    "react-tap-event-plugin": "npm:react-tap-event-plugin@0.2.2",
    "reactcss": "npm:reactcss@0.4.5",
    "redux": "npm:redux@3.3.1",
    "redux-actions": "npm:redux-actions@0.9.1",
    "redux-promise": "npm:redux-promise@0.5.3",
    "redux-thunk": "npm:redux-thunk@2.0.1",
    "repl": "github:jspm/nodelibs-repl@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.6",
    "tls": "github:jspm/nodelibs-tls@0.2.0-alpha",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "tweetnacl": "npm:tweetnacl@0.14.1",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "vm": "github:jspm/nodelibs-vm@0.2.0-alpha",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "npm:httpplease@0.16.4": {
      "map": {
        "urllite": "npm:urllite@0.5.0",
        "xmlhttprequest": "npm:xmlhttprequest@1.8.0",
        "xtend": "npm:xtend@3.0.0"
      }
    },
    "npm:react-inlinesvg@0.4.2": {
      "map": {
        "httpplease": "npm:httpplease@0.16.4",
        "once": "npm:once@1.3.3"
      }
    },
    "npm:urllite@0.5.0": {
      "map": {
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:color-string@0.3.0": {
      "map": {
        "color-name": "npm:color-name@1.1.1"
      }
    },
    "npm:color@0.11.1": {
      "map": {
        "color-convert": "npm:color-convert@0.5.3",
        "color-string": "npm:color-string@0.3.0"
      }
    },
    "github:jspm/nodelibs-crypto@0.2.0-alpha": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.0"
      }
    },
    "github:jspm/nodelibs-punycode@0.2.0-alpha": {
      "map": {
        "punycode-browserify": "npm:punycode@1.3.2"
      }
    },
    "npm:anymatch@1.3.0": {
      "map": {
        "arrify": "npm:arrify@1.0.1",
        "micromatch": "npm:micromatch@2.3.7"
      }
    },
    "npm:are-we-there-yet@1.1.2": {
      "map": {
        "delegates": "npm:delegates@1.0.0",
        "readable-stream": "npm:readable-stream@1.1.13"
      }
    },
    "npm:arr-diff@2.0.0": {
      "map": {
        "arr-flatten": "npm:arr-flatten@1.0.1"
      }
    },
    "npm:asn1.js@4.5.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:aws4@1.3.2": {
      "map": {
        "lru-cache": "npm:lru-cache@4.0.1"
      }
    },
    "npm:babel-cli@6.6.5": {
      "map": {
        "babel-core": "npm:babel-core@6.7.4",
        "babel-polyfill": "npm:babel-polyfill@6.7.4",
        "babel-register": "npm:babel-register@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "bin-version-check": "npm:bin-version-check@2.1.0",
        "chalk": "npm:chalk@1.1.1",
        "commander": "npm:commander@2.8.1",
        "convert-source-map": "npm:convert-source-map@1.2.0",
        "fs-readdir-recursive": "npm:fs-readdir-recursive@0.1.2",
        "glob": "npm:glob@5.0.15",
        "lodash": "npm:lodash@3.10.1",
        "log-symbols": "npm:log-symbols@1.0.2",
        "output-file-sync": "npm:output-file-sync@1.1.1",
        "path-exists": "npm:path-exists@1.0.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "request": "npm:request@2.69.0",
        "slash": "npm:slash@1.0.0",
        "source-map": "npm:source-map@0.5.3",
        "v8flags": "npm:v8flags@2.0.11"
      }
    },
    "npm:babel-core@6.7.4": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.7.4",
        "babel-generator": "npm:babel-generator@6.7.2",
        "babel-helpers": "npm:babel-helpers@6.6.0",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-register": "npm:babel-register@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "convert-source-map": "npm:convert-source-map@1.2.0",
        "debug": "npm:debug@2.2.0",
        "json5": "npm:json5@0.4.0",
        "lodash": "npm:lodash@3.10.1",
        "minimatch": "npm:minimatch@2.0.10",
        "path-exists": "npm:path-exists@1.0.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "private": "npm:private@0.1.6",
        "shebang-regex": "npm:shebang-regex@1.0.0",
        "slash": "npm:slash@1.0.0",
        "source-map": "npm:source-map@0.5.3"
      }
    },
    "npm:babel-generator@6.7.2": {
      "map": {
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "detect-indent": "npm:detect-indent@3.0.1",
        "is-integer": "npm:is-integer@1.0.6",
        "lodash": "npm:lodash@3.10.1",
        "repeating": "npm:repeating@1.1.3",
        "source-map": "npm:source-map@0.5.3",
        "trim-right": "npm:trim-right@1.0.1"
      }
    },
    "npm:babel-helper-bindify-decorators@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-builder-binary-assignment-operator-visitor@6.6.5": {
      "map": {
        "babel-helper-explode-assignable-expression": "npm:babel-helper-explode-assignable-expression@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-call-delegate@6.6.5": {
      "map": {
        "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-define-map@6.6.5": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-helper-explode-assignable-expression@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-explode-class@6.6.5": {
      "map": {
        "babel-helper-bindify-decorators": "npm:babel-helper-bindify-decorators@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-function-name@6.6.0": {
      "map": {
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-get-function-arity@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-hoist-variables@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-optimise-call-expression@6.6.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-regex@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-helper-remap-async-to-generator@6.7.0": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helper-replace-supers@6.7.0": {
      "map": {
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.6.0",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-helpers@6.6.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0"
      }
    },
    "npm:babel-plugin-add-module-exports@0.1.2": {
      "map": {
        "babel-template": "npm:babel-template@6.7.0",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-plugin-syntax-async-functions@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-class-constructor-call@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-class-properties@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-decorators@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-exponentiation-operator@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-export-extensions@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-flow@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-object-rest-spread@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-trailing-function-commas@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-async-to-generator@6.7.4": {
      "map": {
        "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.7.0",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-class-constructor-call@6.6.5": {
      "map": {
        "babel-plugin-syntax-class-constructor-call": "npm:babel-plugin-syntax-class-constructor-call@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0"
      }
    },
    "npm:babel-plugin-transform-class-properties@6.6.0": {
      "map": {
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-decorators-legacy@1.3.4": {
      "map": {
        "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.5.0",
        "babel-runtime": "npm:babel-runtime@6.6.1",
        "babel-template": "npm:babel-template@6.7.0"
      }
    },
    "npm:babel-plugin-transform-decorators@6.6.5": {
      "map": {
        "babel-helper-define-map": "npm:babel-helper-define-map@6.6.5",
        "babel-helper-explode-class": "npm:babel-helper-explode-class@6.6.5",
        "babel-plugin-syntax-decorators": "npm:babel-plugin-syntax-decorators@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-arrow-functions@6.5.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoped-functions@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoping@6.7.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-plugin-transform-es2015-classes@6.6.5": {
      "map": {
        "babel-helper-define-map": "npm:babel-helper-define-map@6.6.5",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.6.0",
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.7.0",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-computed-properties@6.6.5": {
      "map": {
        "babel-helper-define-map": "npm:babel-helper-define-map@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0"
      }
    },
    "npm:babel-plugin-transform-es2015-constants@6.1.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-destructuring@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-for-of@6.6.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-function-name@6.5.0": {
      "map": {
        "babel-helper-function-name": "npm:babel-helper-function-name@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-literals@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-commonjs@6.7.4": {
      "map": {
        "babel-plugin-transform-strict-mode": "npm:babel-plugin-transform-strict-mode@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-object-super@6.6.5": {
      "map": {
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.7.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-parameters@6.7.0": {
      "map": {
        "babel-helper-call-delegate": "npm:babel-helper-call-delegate@6.6.5",
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-template": "npm:babel-template@6.7.0",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-shorthand-properties@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-spread@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-sticky-regex@6.5.0": {
      "map": {
        "babel-helper-regex": "npm:babel-helper-regex@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-plugin-transform-es2015-template-literals@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-typeof-symbol@6.6.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-es2015-unicode-regex@6.5.0": {
      "map": {
        "babel-helper-regex": "npm:babel-helper-regex@6.6.5",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "regexpu-core": "npm:regexpu-core@1.0.0"
      }
    },
    "npm:babel-plugin-transform-exponentiation-operator@6.5.0": {
      "map": {
        "babel-helper-builder-binary-assignment-operator-visitor": "npm:babel-helper-builder-binary-assignment-operator-visitor@6.6.5",
        "babel-plugin-syntax-exponentiation-operator": "npm:babel-plugin-syntax-exponentiation-operator@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-export-extensions@6.5.0": {
      "map": {
        "babel-plugin-syntax-export-extensions": "npm:babel-plugin-syntax-export-extensions@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-flow-strip-types@6.7.0": {
      "map": {
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-object-rest-spread@6.6.5": {
      "map": {
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-react-display-name@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-react-jsx-source@6.5.0": {
      "map": {
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-regenerator@6.6.5": {
      "map": {
        "babel-core": "npm:babel-core@6.7.4",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.5.0",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.7.1",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.6.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "private": "npm:private@0.1.6"
      }
    },
    "npm:babel-plugin-transform-strict-mode@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2"
      }
    },
    "npm:babel-polyfill@6.7.4": {
      "map": {
        "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "core-js": "npm:core-js@2.2.1"
      }
    },
    "npm:babel-preset-es2015-loose@6.1.4": {
      "map": {
        "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.5.2",
        "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.6.5",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.7.1",
        "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.6.5",
        "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.6.5",
        "babel-plugin-transform-es2015-constants": "npm:babel-plugin-transform-es2015-constants@6.1.4",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.6.5",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.6.0",
        "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.5.0",
        "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.5.0",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.7.4",
        "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.6.5",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.7.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.5.0",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.6.5",
        "babel-plugin-transform-es2015-sticky-regex": "npm:babel-plugin-transform-es2015-sticky-regex@6.5.0",
        "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.6.5",
        "babel-plugin-transform-es2015-typeof-symbol": "npm:babel-plugin-transform-es2015-typeof-symbol@6.6.0",
        "babel-plugin-transform-es2015-unicode-regex": "npm:babel-plugin-transform-es2015-unicode-regex@6.5.0",
        "babel-plugin-transform-regenerator": "npm:babel-plugin-transform-regenerator@6.6.5"
      }
    },
    "npm:babel-preset-react@6.5.0": {
      "map": {
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.5.0",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
        "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.7.0",
        "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.5.0",
        "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.7.4",
        "babel-plugin-transform-react-jsx-source": "npm:babel-plugin-transform-react-jsx-source@6.5.0"
      }
    },
    "npm:babel-preset-stage-1@6.5.0": {
      "map": {
        "babel-plugin-transform-class-constructor-call": "npm:babel-plugin-transform-class-constructor-call@6.6.5",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.6.0",
        "babel-plugin-transform-decorators": "npm:babel-plugin-transform-decorators@6.6.5",
        "babel-plugin-transform-export-extensions": "npm:babel-plugin-transform-export-extensions@6.5.0",
        "babel-preset-stage-2": "npm:babel-preset-stage-2@6.5.0"
      }
    },
    "npm:babel-preset-stage-2@6.5.0": {
      "map": {
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.5.0",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.6.5",
        "babel-preset-stage-3": "npm:babel-preset-stage-3@6.5.0"
      }
    },
    "npm:babel-preset-stage-3@6.5.0": {
      "map": {
        "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.7.4",
        "babel-plugin-transform-exponentiation-operator": "npm:babel-plugin-transform-exponentiation-operator@6.5.0"
      }
    },
    "npm:babel-register@6.7.2": {
      "map": {
        "babel-core": "npm:babel-core@6.7.4",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "core-js": "npm:core-js@2.2.1",
        "home-or-tmp": "npm:home-or-tmp@1.0.0",
        "lodash": "npm:lodash@3.10.1",
        "mkdirp": "npm:mkdirp@0.5.1",
        "path-exists": "npm:path-exists@1.0.0",
        "source-map-support": "npm:source-map-support@0.2.10"
      }
    },
    "npm:babel-runtime@6.6.1": {
      "map": {
        "core-js": "npm:core-js@2.2.1"
      }
    },
    "npm:babel-template@6.7.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:bin-version-check@2.1.0": {
      "map": {
        "bin-version": "npm:bin-version@1.0.4",
        "minimist": "npm:minimist@1.2.0",
        "semver": "npm:semver@4.3.6",
        "semver-truncate": "npm:semver-truncate@1.1.0"
      }
    },
    "npm:bin-version@1.0.4": {
      "map": {
        "find-versions": "npm:find-versions@1.2.1"
      }
    },
    "npm:bl@1.0.3": {
      "map": {
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:block-stream@0.0.8": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:boom@2.10.1": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:braces@1.8.3": {
      "map": {
        "expand-range": "npm:expand-range@1.8.1",
        "preserve": "npm:preserve@0.2.0",
        "repeat-element": "npm:repeat-element@1.1.2"
      }
    },
    "npm:browserify-aes@1.0.6": {
      "map": {
        "buffer-xor": "npm:buffer-xor@1.0.3",
        "cipher-base": "npm:cipher-base@1.0.2",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "browserify-des": "npm:browserify-des@1.0.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "des.js": "npm:des.js@1.0.0",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:browserify-sign@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "elliptic": "npm:elliptic@6.2.3",
        "inherits": "npm:inherits@2.0.1",
        "parse-asn1": "npm:parse-asn1@5.0.0"
      }
    },
    "npm:camelcase-keys@2.1.0": {
      "map": {
        "camelcase": "npm:camelcase@2.1.1",
        "map-obj": "npm:map-obj@1.0.1"
      }
    },
    "npm:chokidar@1.4.3": {
      "map": {
        "anymatch": "npm:anymatch@1.3.0",
        "async-each": "npm:async-each@1.0.0",
        "glob-parent": "npm:glob-parent@2.0.0",
        "inherits": "npm:inherits@2.0.1",
        "is-binary-path": "npm:is-binary-path@1.0.1",
        "is-glob": "npm:is-glob@2.0.1",
        "path-is-absolute": "npm:path-is-absolute@1.0.0",
        "readdirp": "npm:readdirp@2.0.0"
      }
    },
    "npm:cipher-base@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:combined-stream@1.0.5": {
      "map": {
        "delayed-stream": "npm:delayed-stream@1.0.0"
      }
    },
    "npm:commander@2.9.0": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "elliptic": "npm:elliptic@6.2.3"
      }
    },
    "npm:create-hash@1.1.2": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "ripemd160": "npm:ripemd160@1.0.1",
        "sha.js": "npm:sha.js@2.4.5"
      }
    },
    "npm:create-hmac@1.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:cryptiles@2.0.5": {
      "map": {
        "boom": "npm:boom@2.10.1"
      }
    },
    "npm:crypto-browserify@3.11.0": {
      "map": {
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "browserify-sign": "npm:browserify-sign@4.0.0",
        "create-ecdh": "npm:create-ecdh@4.0.0",
        "create-hash": "npm:create-hash@1.1.2",
        "create-hmac": "npm:create-hmac@1.1.4",
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "inherits": "npm:inherits@2.0.1",
        "pbkdf2": "npm:pbkdf2@3.0.4",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:dashdash@1.13.0": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:detect-indent@3.0.1": {
      "map": {
        "get-stdin": "npm:get-stdin@4.0.1",
        "minimist": "npm:minimist@1.2.0",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "miller-rabin": "npm:miller-rabin@4.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:ecc-jsbn@0.1.1": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:elliptic@6.2.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "brorand": "npm:brorand@1.0.5",
        "hash.js": "npm:hash.js@1.0.3",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:error-ex@1.3.0": {
      "map": {
        "is-arrayish": "npm:is-arrayish@0.2.1"
      }
    },
    "npm:evp_bytestokey@1.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.2"
      }
    },
    "npm:expand-range@1.8.1": {
      "map": {
        "fill-range": "npm:fill-range@2.2.3"
      }
    },
    "npm:extglob@0.3.2": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:fill-range@2.2.3": {
      "map": {
        "is-number": "npm:is-number@2.1.0",
        "isobject": "npm:isobject@2.0.0",
        "randomatic": "npm:randomatic@1.1.5",
        "repeat-element": "npm:repeat-element@1.1.2",
        "repeat-string": "npm:repeat-string@1.5.4"
      }
    },
    "npm:find-up@1.1.2": {
      "map": {
        "path-exists": "npm:path-exists@2.1.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.0"
      }
    },
    "npm:find-versions@1.2.1": {
      "map": {
        "array-uniq": "npm:array-uniq@1.0.2",
        "get-stdin": "npm:get-stdin@4.0.1",
        "meow": "npm:meow@3.7.0",
        "semver-regex": "npm:semver-regex@1.0.0"
      }
    },
    "npm:for-own@0.1.4": {
      "map": {
        "for-in": "npm:for-in@0.1.5"
      }
    },
    "npm:form-data@1.0.0-rc4": {
      "map": {
        "async": "npm:async@1.5.2",
        "combined-stream": "npm:combined-stream@1.0.5",
        "mime-types": "npm:mime-types@2.1.10"
      }
    },
    "npm:fsevents@1.0.9": {
      "map": {
        "nan": "npm:nan@2.2.0",
        "node-pre-gyp": "npm:node-pre-gyp@0.6.24"
      }
    },
    "npm:fstream-ignore@1.0.3": {
      "map": {
        "fstream": "npm:fstream@1.0.8",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.0"
      }
    },
    "npm:fstream@1.0.8": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.3",
        "inherits": "npm:inherits@2.0.1",
        "mkdirp": "npm:mkdirp@0.5.1",
        "rimraf": "npm:rimraf@2.5.2"
      }
    },
    "npm:gauge@1.2.7": {
      "map": {
        "ansi": "npm:ansi@0.3.1",
        "has-unicode": "npm:has-unicode@2.0.0",
        "lodash.pad": "npm:lodash.pad@4.1.0",
        "lodash.padend": "npm:lodash.padend@4.2.0",
        "lodash.padstart": "npm:lodash.padstart@4.2.0"
      }
    },
    "npm:generate-object-property@1.2.0": {
      "map": {
        "is-property": "npm:is-property@1.0.2"
      }
    },
    "npm:glob-base@0.3.0": {
      "map": {
        "glob-parent": "npm:glob-parent@2.0.0",
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:glob-parent@2.0.0": {
      "map": {
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:glob@5.0.15": {
      "map": {
        "inflight": "npm:inflight@1.0.4",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.0",
        "once": "npm:once@1.3.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.0"
      }
    },
    "npm:har-validator@2.0.6": {
      "map": {
        "chalk": "npm:chalk@1.1.1",
        "commander": "npm:commander@2.9.0",
        "is-my-json-valid": "npm:is-my-json-valid@2.13.1",
        "pinkie-promise": "npm:pinkie-promise@2.0.0"
      }
    },
    "npm:hash.js@1.0.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:hawk@3.1.3": {
      "map": {
        "boom": "npm:boom@2.10.1",
        "cryptiles": "npm:cryptiles@2.0.5",
        "hoek": "npm:hoek@2.16.3",
        "sntp": "npm:sntp@1.0.9"
      }
    },
    "npm:home-or-tmp@1.0.0": {
      "map": {
        "os-tmpdir": "npm:os-tmpdir@1.0.1",
        "user-home": "npm:user-home@1.1.1"
      }
    },
    "npm:http-signature@1.1.1": {
      "map": {
        "assert-plus": "npm:assert-plus@0.2.0",
        "jsprim": "npm:jsprim@1.2.2",
        "sshpk": "npm:sshpk@1.7.4"
      }
    },
    "npm:indent-string@2.1.0": {
      "map": {
        "repeating": "npm:repeating@2.0.0"
      }
    },
    "npm:is-binary-path@1.0.1": {
      "map": {
        "binary-extensions": "npm:binary-extensions@1.4.0"
      }
    },
    "npm:is-builtin-module@1.0.0": {
      "map": {
        "builtin-modules": "npm:builtin-modules@1.1.1"
      }
    },
    "npm:is-equal-shallow@0.1.3": {
      "map": {
        "is-primitive": "npm:is-primitive@2.0.0"
      }
    },
    "npm:is-glob@2.0.1": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:is-integer@1.0.6": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:is-my-json-valid@2.13.1": {
      "map": {
        "generate-function": "npm:generate-function@2.0.0",
        "generate-object-property": "npm:generate-object-property@1.2.0",
        "jsonpointer": "npm:jsonpointer@2.0.0",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:is-number@2.1.0": {
      "map": {
        "kind-of": "npm:kind-of@3.0.2"
      }
    },
    "npm:isobject@2.0.0": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    },
    "npm:jodid25519@1.0.2": {
      "map": {
        "jsbn": "npm:jsbn@0.1.0"
      }
    },
    "npm:jsprim@1.2.2": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2",
        "json-schema": "npm:json-schema@0.2.2",
        "verror": "npm:verror@1.3.6"
      }
    },
    "npm:kind-of@3.0.2": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.3"
      }
    },
    "npm:load-json-file@1.1.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.3",
        "parse-json": "npm:parse-json@2.2.0",
        "pify": "npm:pify@2.3.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.0",
        "strip-bom": "npm:strip-bom@2.0.0"
      }
    },
    "npm:lodash.pad@4.1.0": {
      "map": {
        "lodash.repeat": "npm:lodash.repeat@4.0.0",
        "lodash.tostring": "npm:lodash.tostring@4.1.2"
      }
    },
    "npm:lodash.padend@4.2.0": {
      "map": {
        "lodash.repeat": "npm:lodash.repeat@4.0.0",
        "lodash.tostring": "npm:lodash.tostring@4.1.2"
      }
    },
    "npm:lodash.padstart@4.2.0": {
      "map": {
        "lodash.repeat": "npm:lodash.repeat@4.0.0",
        "lodash.tostring": "npm:lodash.tostring@4.1.2"
      }
    },
    "npm:lodash.repeat@4.0.0": {
      "map": {
        "lodash.tostring": "npm:lodash.tostring@4.1.2"
      }
    },
    "npm:log-symbols@1.0.2": {
      "map": {
        "chalk": "npm:chalk@1.1.1"
      }
    },
    "npm:loud-rejection@1.3.0": {
      "map": {
        "array-find-index": "npm:array-find-index@1.0.1",
        "signal-exit": "npm:signal-exit@2.1.2"
      }
    },
    "npm:lru-cache@4.0.1": {
      "map": {
        "pseudomap": "npm:pseudomap@1.0.2",
        "yallist": "npm:yallist@2.0.0"
      }
    },
    "npm:meow@3.7.0": {
      "map": {
        "camelcase-keys": "npm:camelcase-keys@2.1.0",
        "decamelize": "npm:decamelize@1.2.0",
        "loud-rejection": "npm:loud-rejection@1.3.0",
        "map-obj": "npm:map-obj@1.0.1",
        "minimist": "npm:minimist@1.2.0",
        "normalize-package-data": "npm:normalize-package-data@2.3.5",
        "object-assign": "npm:object-assign@4.0.1",
        "read-pkg-up": "npm:read-pkg-up@1.0.1",
        "redent": "npm:redent@1.0.0",
        "trim-newlines": "npm:trim-newlines@1.0.0"
      }
    },
    "npm:micromatch@2.3.7": {
      "map": {
        "arr-diff": "npm:arr-diff@2.0.0",
        "array-unique": "npm:array-unique@0.2.1",
        "braces": "npm:braces@1.8.3",
        "expand-brackets": "npm:expand-brackets@0.1.4",
        "extglob": "npm:extglob@0.3.2",
        "filename-regex": "npm:filename-regex@2.0.0",
        "is-extglob": "npm:is-extglob@1.0.0",
        "is-glob": "npm:is-glob@2.0.1",
        "kind-of": "npm:kind-of@3.0.2",
        "normalize-path": "npm:normalize-path@2.0.1",
        "object.omit": "npm:object.omit@2.0.0",
        "parse-glob": "npm:parse-glob@3.0.4",
        "regex-cache": "npm:regex-cache@0.4.2"
      }
    },
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "brorand": "npm:brorand@1.0.5"
      }
    },
    "npm:mime-types@2.1.10": {
      "map": {
        "mime-db": "npm:mime-db@1.22.0"
      }
    },
    "npm:minimatch@2.0.10": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.3"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:node-pre-gyp@0.6.24": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1",
        "nopt": "npm:nopt@3.0.6",
        "npmlog": "npm:npmlog@2.0.3",
        "rc": "npm:rc@1.1.6",
        "request": "npm:request@2.69.0",
        "rimraf": "npm:rimraf@2.5.2",
        "semver": "npm:semver@5.1.0",
        "tar": "npm:tar@2.2.1",
        "tar-pack": "npm:tar-pack@3.1.3"
      }
    },
    "npm:nopt@3.0.6": {
      "map": {
        "abbrev": "npm:abbrev@1.0.7"
      }
    },
    "npm:normalize-package-data@2.3.5": {
      "map": {
        "hosted-git-info": "npm:hosted-git-info@2.1.4",
        "is-builtin-module": "npm:is-builtin-module@1.0.0",
        "semver": "npm:semver@5.1.0",
        "validate-npm-package-license": "npm:validate-npm-package-license@3.0.1"
      }
    },
    "npm:npmlog@2.0.3": {
      "map": {
        "ansi": "npm:ansi@0.3.1",
        "are-we-there-yet": "npm:are-we-there-yet@1.1.2",
        "gauge": "npm:gauge@1.2.7"
      }
    },
    "npm:object.omit@2.0.0": {
      "map": {
        "for-own": "npm:for-own@0.1.4",
        "is-extendable": "npm:is-extendable@0.1.1"
      }
    },
    "npm:output-file-sync@1.1.1": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:parse-asn1@5.0.0": {
      "map": {
        "asn1.js": "npm:asn1.js@4.5.2",
        "browserify-aes": "npm:browserify-aes@1.0.6",
        "create-hash": "npm:create-hash@1.1.2",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.0",
        "pbkdf2": "npm:pbkdf2@3.0.4"
      }
    },
    "npm:parse-glob@3.0.4": {
      "map": {
        "glob-base": "npm:glob-base@0.3.0",
        "is-dotfile": "npm:is-dotfile@1.0.2",
        "is-extglob": "npm:is-extglob@1.0.0",
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:parse-json@2.2.0": {
      "map": {
        "error-ex": "npm:error-ex@1.3.0"
      }
    },
    "npm:path-exists@2.1.0": {
      "map": {
        "pinkie-promise": "npm:pinkie-promise@2.0.0"
      }
    },
    "npm:path-type@1.1.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.3",
        "pify": "npm:pify@2.3.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.0"
      }
    },
    "npm:pbkdf2@3.0.4": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.4"
      }
    },
    "npm:pinkie-promise@2.0.0": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.1",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "create-hash": "npm:create-hash@1.1.2",
        "parse-asn1": "npm:parse-asn1@5.0.0",
        "randombytes": "npm:randombytes@2.0.3"
      }
    },
    "npm:radium@0.17.0": {
      "map": {
        "array-find": "npm:array-find@1.0.0",
        "babel-cli": "npm:babel-cli@6.6.5",
        "babel-core": "npm:babel-core@6.7.4",
        "babel-plugin-add-module-exports": "npm:babel-plugin-add-module-exports@0.1.2",
        "babel-plugin-transform-decorators-legacy": "npm:babel-plugin-transform-decorators-legacy@1.3.4",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.7.4",
        "babel-preset-es2015-loose": "npm:babel-preset-es2015-loose@6.1.4",
        "babel-preset-react": "npm:babel-preset-react@6.5.0",
        "babel-preset-stage-1": "npm:babel-preset-stage-1@6.5.0",
        "exenv": "npm:exenv@1.2.0",
        "inline-style-prefixer": "npm:inline-style-prefixer@1.0.3",
        "rimraf": "npm:rimraf@2.5.2"
      }
    },
    "npm:randomatic@1.1.5": {
      "map": {
        "is-number": "npm:is-number@2.1.0",
        "kind-of": "npm:kind-of@3.0.2"
      }
    },
    "npm:rc@1.1.6": {
      "map": {
        "deep-extend": "npm:deep-extend@0.4.1",
        "ini": "npm:ini@1.3.4",
        "minimist": "npm:minimist@1.2.0",
        "strip-json-comments": "npm:strip-json-comments@1.0.4"
      }
    },
    "npm:read-pkg-up@1.0.1": {
      "map": {
        "find-up": "npm:find-up@1.1.2",
        "read-pkg": "npm:read-pkg@1.1.0"
      }
    },
    "npm:read-pkg@1.1.0": {
      "map": {
        "load-json-file": "npm:load-json-file@1.1.0",
        "normalize-package-data": "npm:normalize-package-data@2.3.5",
        "path-type": "npm:path-type@1.1.0"
      }
    },
    "npm:readable-stream@1.1.13": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@0.0.1",
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:readdirp@2.0.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.3",
        "minimatch": "npm:minimatch@2.0.10",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:redent@1.0.0": {
      "map": {
        "indent-string": "npm:indent-string@2.1.0",
        "strip-indent": "npm:strip-indent@1.0.1"
      }
    },
    "npm:regex-cache@0.4.2": {
      "map": {
        "is-equal-shallow": "npm:is-equal-shallow@0.1.3",
        "is-primitive": "npm:is-primitive@2.0.0"
      }
    },
    "npm:regexpu-core@1.0.0": {
      "map": {
        "regenerate": "npm:regenerate@1.2.1",
        "regjsgen": "npm:regjsgen@0.2.0",
        "regjsparser": "npm:regjsparser@0.1.5"
      }
    },
    "npm:regjsparser@0.1.5": {
      "map": {
        "jsesc": "npm:jsesc@0.5.0"
      }
    },
    "npm:repeating@2.0.0": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:request@2.69.0": {
      "map": {
        "aws-sign2": "npm:aws-sign2@0.6.0",
        "aws4": "npm:aws4@1.3.2",
        "bl": "npm:bl@1.0.3",
        "caseless": "npm:caseless@0.11.0",
        "combined-stream": "npm:combined-stream@1.0.5",
        "extend": "npm:extend@3.0.0",
        "forever-agent": "npm:forever-agent@0.6.1",
        "form-data": "npm:form-data@1.0.0-rc4",
        "har-validator": "npm:har-validator@2.0.6",
        "hawk": "npm:hawk@3.1.3",
        "http-signature": "npm:http-signature@1.1.1",
        "is-typedarray": "npm:is-typedarray@1.0.0",
        "isstream": "npm:isstream@0.1.2",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "mime-types": "npm:mime-types@2.1.10",
        "node-uuid": "npm:node-uuid@1.4.7",
        "oauth-sign": "npm:oauth-sign@0.8.1",
        "qs": "npm:qs@6.0.2",
        "stringstream": "npm:stringstream@0.0.5",
        "tough-cookie": "npm:tough-cookie@2.2.2",
        "tunnel-agent": "npm:tunnel-agent@0.4.2"
      }
    },
    "npm:semver-truncate@1.1.0": {
      "map": {
        "semver": "npm:semver@5.1.0"
      }
    },
    "npm:sha.js@2.4.5": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:sntp@1.0.9": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:source-map-support@0.2.10": {
      "map": {
        "source-map": "npm:source-map@0.1.32"
      }
    },
    "npm:source-map@0.1.32": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:spdx-correct@1.0.2": {
      "map": {
        "spdx-license-ids": "npm:spdx-license-ids@1.2.0"
      }
    },
    "npm:spdx-expression-parse@1.0.2": {
      "map": {
        "spdx-exceptions": "npm:spdx-exceptions@1.0.4",
        "spdx-license-ids": "npm:spdx-license-ids@1.2.0"
      }
    },
    "npm:sshpk@1.7.4": {
      "map": {
        "asn1": "npm:asn1@0.2.3",
        "assert-plus": "npm:assert-plus@0.2.0",
        "dashdash": "npm:dashdash@1.13.0"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@1.1.13"
      }
    },
    "npm:strip-bom@2.0.0": {
      "map": {
        "is-utf8": "npm:is-utf8@0.2.1"
      }
    },
    "npm:strip-indent@1.0.1": {
      "map": {
        "get-stdin": "npm:get-stdin@4.0.1"
      }
    },
    "npm:tar-pack@3.1.3": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "fstream": "npm:fstream@1.0.8",
        "fstream-ignore": "npm:fstream-ignore@1.0.3",
        "once": "npm:once@1.3.3",
        "readable-stream": "npm:readable-stream@2.0.6",
        "rimraf": "npm:rimraf@2.5.2",
        "tar": "npm:tar@2.2.1",
        "uid-number": "npm:uid-number@0.0.6"
      }
    },
    "npm:tar@2.2.1": {
      "map": {
        "block-stream": "npm:block-stream@0.0.8",
        "fstream": "npm:fstream@1.0.8",
        "inherits": "npm:inherits@2.0.1"
      }
    },
    "npm:v8flags@2.0.11": {
      "map": {
        "user-home": "npm:user-home@1.1.1"
      }
    },
    "npm:validate-npm-package-license@3.0.1": {
      "map": {
        "spdx-correct": "npm:spdx-correct@1.0.2",
        "spdx-expression-parse": "npm:spdx-expression-parse@1.0.2"
      }
    },
    "npm:verror@1.3.6": {
      "map": {
        "extsprintf": "npm:extsprintf@1.0.2"
      }
    },
    "github:capaj/systemjs-hot-reloader@0.5.6": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "socket.io-client": "github:socketio/socket.io-client@1.4.5",
        "weakee": "npm:weakee@1.0.0"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-domain@0.2.0-alpha": {
      "map": {
        "domain-browserify": "npm:domain-browser@1.1.7"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.2.1"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-string_decoder@0.2.0-alpha": {
      "map": {
        "string_decoder-browserify": "npm:string_decoder@0.10.31"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "github:jspm/nodelibs-zlib@0.2.0-alpha": {
      "map": {
        "zlib-browserify": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:ansi-styles@2.2.0": {
      "map": {
        "color-convert": "npm:color-convert@1.0.0"
      }
    },
    "npm:babel-code-frame@6.7.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "chalk": "npm:chalk@1.1.1",
        "esutils": "npm:esutils@2.0.2",
        "js-tokens": "npm:js-tokens@1.0.3",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-helper-builder-react-jsx@6.6.5": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:babel-messages@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-syntax-jsx@6.5.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-plugin-transform-react-jsx@6.7.4": {
      "map": {
        "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.6.5",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:babel-traverse@6.7.4": {
      "map": {
        "babel-code-frame": "npm:babel-code-frame@6.7.4",
        "babel-messages": "npm:babel-messages@6.7.2",
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-types": "npm:babel-types@6.7.2",
        "babylon": "npm:babylon@6.7.0",
        "debug": "npm:debug@2.2.0",
        "globals": "npm:globals@8.18.0",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@3.10.1",
        "repeating": "npm:repeating@1.1.3"
      }
    },
    "npm:babel-types@6.7.2": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "babel-traverse": "npm:babel-traverse@6.7.4",
        "esutils": "npm:esutils@2.0.2",
        "lodash": "npm:lodash@3.10.1",
        "to-fast-properties": "npm:to-fast-properties@1.0.2"
      }
    },
    "npm:babylon@6.7.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38"
      }
    },
    "npm:brace-expansion@1.1.3": {
      "map": {
        "balanced-match": "npm:balanced-match@0.3.0",
        "concat-map": "npm:concat-map@0.0.1"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.8",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:chalk@1.1.1": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.0",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:clean-css@3.4.10": {
      "map": {
        "commander": "npm:commander@2.8.1",
        "source-map": "npm:source-map@0.4.4"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.13"
      }
    },
    "npm:fbjs@0.2.1": {
      "map": {
        "core-js": "npm:core-js@1.2.6",
        "promise": "npm:promise@7.1.1",
        "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
      }
    },
    "npm:flux-standard-action@0.6.1": {
      "map": {
        "lodash.isplainobject": "npm:lodash.isplainobject@3.2.0"
      }
    },
    "npm:font-awesome@4.5.0": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.20"
      }
    },
    "npm:glob@7.0.3": {
      "map": {
        "inflight": "npm:inflight@1.0.4",
        "inherits": "npm:inherits@2.0.1",
        "minimatch": "npm:minimatch@3.0.0",
        "once": "npm:once@1.3.3",
        "path-is-absolute": "npm:path-is-absolute@1.0.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:history@2.0.1": {
      "map": {
        "deep-equal": "npm:deep-equal@1.0.1",
        "invariant": "npm:invariant@2.2.1",
        "query-string": "npm:query-string@3.0.3",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:inflight@1.0.4": {
      "map": {
        "once": "npm:once@1.3.3",
        "wrappy": "npm:wrappy@1.0.1"
      }
    },
    "npm:inline-style-prefixer@0.6.7": {
      "map": {
        "bowser": "npm:bowser@1.0.0"
      }
    },
    "npm:inline-style-prefixer@1.0.3": {
      "map": {
        "bowser": "npm:bowser@1.0.0",
        "inline-style-prefix-all": "npm:inline-style-prefix-all@1.0.4"
      }
    },
    "npm:invariant@2.2.1": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:is-finite@1.0.1": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.0"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.4.1",
        "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
      }
    },
    "npm:lodash.isplainobject@3.2.0": {
      "map": {
        "lodash._basefor": "npm:lodash._basefor@3.0.3",
        "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
        "lodash.keysin": "npm:lodash.keysin@3.0.8"
      }
    },
    "npm:lodash.keysin@3.0.8": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.0.8",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash.merge@4.3.2": {
      "map": {
        "lodash._baseclone": "npm:lodash._baseclone@4.5.3",
        "lodash._stack": "npm:lodash._stack@4.1.1",
        "lodash.isplainobject": "npm:lodash.isplainobject@4.0.3",
        "lodash.keysin": "npm:lodash.keysin@4.1.3",
        "lodash.rest": "npm:lodash.rest@4.0.1"
      }
    },
    "npm:lodash.throttle@4.0.1": {
      "map": {
        "lodash.debounce": "npm:lodash.debounce@4.0.3"
      }
    },
    "npm:loose-envify@1.1.0": {
      "map": {
        "js-tokens": "npm:js-tokens@1.0.3"
      }
    },
    "npm:material-ui@0.15.0-alpha.2": {
      "map": {
        "inline-style-prefixer": "npm:inline-style-prefixer@1.0.3",
        "keycode": "npm:keycode@2.1.1",
        "lodash.flowright": "npm:lodash.flowright@3.2.1",
        "lodash.merge": "npm:lodash.merge@4.3.2",
        "lodash.throttle": "npm:lodash.throttle@4.0.1",
        "react-addons-create-fragment": "npm:react-addons-create-fragment@0.14.7",
        "react-addons-pure-render-mixin": "npm:react-addons-pure-render-mixin@0.14.7",
        "react-addons-transition-group": "npm:react-addons-transition-group@0.14.7",
        "react-addons-update": "npm:react-addons-update@0.14.7",
        "react-event-listener": "npm:react-event-listener@0.1.1",
        "recompose": "npm:recompose@0.15.1",
        "simple-assign": "npm:simple-assign@0.1.0",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:minimatch@3.0.0": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.3"
      }
    },
    "npm:node-fetch@1.4.1": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.0.1"
      }
    },
    "npm:once@1.3.3": {
      "map": {
        "wrappy": "npm:wrappy@1.0.1"
      }
    },
    "npm:promise@7.1.1": {
      "map": {
        "asap": "npm:asap@2.0.3"
      }
    },
    "npm:query-string@3.0.3": {
      "map": {
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:radium@0.16.6": {
      "map": {
        "array-find": "npm:array-find@1.0.0",
        "exenv": "npm:exenv@1.2.0",
        "inline-style-prefixer": "npm:inline-style-prefixer@0.6.7",
        "rimraf": "npm:rimraf@2.5.2"
      }
    },
    "npm:react-image-lightbox@1.1.1": {
      "map": {
        "radium": "npm:radium@0.16.6"
      }
    },
    "npm:react-redux@4.4.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.5",
        "invariant": "npm:invariant@2.2.1",
        "lodash": "npm:lodash@4.6.1",
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:react-router@2.0.1": {
      "map": {
        "history": "npm:history@2.0.1",
        "invariant": "npm:invariant@2.2.1",
        "warning": "npm:warning@2.1.0"
      }
    },
    "npm:react-tap-event-plugin@0.2.2": {
      "map": {
        "fbjs": "npm:fbjs@0.2.1"
      }
    },
    "npm:react@0.14.7": {
      "map": {
        "fbjs": "npm:fbjs@0.6.1"
      }
    },
    "npm:reactcss@0.4.5": {
      "map": {
        "lodash.isarray": "npm:lodash.isarray@4.0.0",
        "lodash.isobject": "npm:lodash.isobject@3.0.2",
        "merge": "npm:merge@1.2.0",
        "react": "npm:react@0.14.7"
      }
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:recompose@0.15.1": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@1.0.5",
        "lodash": "npm:lodash@4.6.1"
      }
    },
    "npm:redux-actions@0.9.1": {
      "map": {
        "flux-standard-action": "npm:flux-standard-action@0.6.1",
        "reduce-reducers": "npm:reduce-reducers@0.1.2"
      }
    },
    "npm:redux-promise@0.5.3": {
      "map": {
        "flux-standard-action": "npm:flux-standard-action@0.6.1"
      }
    },
    "npm:redux@3.3.1": {
      "map": {
        "lodash": "npm:lodash@4.6.1",
        "lodash-es": "npm:lodash-es@4.6.1",
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    },
    "npm:repeating@1.1.3": {
      "map": {
        "is-finite": "npm:is-finite@1.0.1"
      }
    },
    "npm:rimraf@2.5.2": {
      "map": {
        "glob": "npm:glob@7.0.3"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:stream-http@2.2.1": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "inherits": "npm:inherits@2.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.0.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:warning@2.1.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.1.0"
      }
    }
  }
});
