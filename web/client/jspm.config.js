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
    "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.7.4",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "clean-css": "npm:clean-css@3.4.10",
    "color": "npm:color@0.11.1",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "domain": "github:jspm/nodelibs-domain@0.2.0-alpha",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
    "lodash": "npm:lodash@4.6.1",
    "material-ui": "npm:material-ui@0.15.0-alpha.2",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "moment": "npm:moment@2.12.0",
    "net": "github:jspm/nodelibs-net@0.2.0-alpha",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "radium": "npm:radium@0.17.1",
    "react": "npm:react@0.14.7",
    "react-dom": "npm:react-dom@0.14.7",
    "react-ga": "npm:react-ga@1.2.1",
    "react-image-lightbox": "npm:react-image-lightbox@1.1.1",
    "react-infinite": "npm:react-infinite@0.9.0",
    "react-redux": "npm:react-redux@4.4.1",
    "react-router": "npm:react-router@2.0.1",
    "react-sidebar": "npm:react-sidebar@2.1.1",
    "react-tap-event-plugin": "npm:react-tap-event-plugin@0.2.2",
    "react-waypoint": "npm:react-waypoint@1.3.1",
    "reactcss": "npm:reactcss@0.4.5",
    "redux": "npm:redux@3.3.1",
    "redux-actions": "npm:redux-actions@0.9.1",
    "redux-promise": "npm:redux-promise@0.5.3",
    "redux-thunk": "npm:redux-thunk@2.0.1",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "string_decoder": "github:jspm/nodelibs-string_decoder@0.2.0-alpha",
    "systemjs-hot-reloader": "github:capaj/systemjs-hot-reloader@0.5.6",
    "tty": "github:jspm/nodelibs-tty@0.2.0-alpha",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha",
    "zlib": "github:jspm/nodelibs-zlib@0.2.0-alpha"
  },
  packages: {
    "npm:react-infinite@0.9.0": {
      "map": {
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.isfinite": "npm:lodash.isfinite@3.2.0",
        "object-assign": "npm:object-assign@4.0.1"
      }
    },
    "npm:radium@0.17.1": {
      "map": {
        "array-find": "npm:array-find@1.0.0",
        "exenv": "npm:exenv@1.2.0",
        "inline-style-prefixer": "npm:inline-style-prefixer@1.0.3",
        "rimraf": "npm:rimraf@2.5.2"
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
    "npm:babel-code-frame@6.7.4": {
      "map": {
        "babel-runtime": "npm:babel-runtime@5.8.38",
        "chalk": "npm:chalk@1.1.3",
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
    "npm:chalk@1.1.3": {
      "map": {
        "ansi-styles": "npm:ansi-styles@2.2.1",
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
