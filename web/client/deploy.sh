#!/bin/bash

set -eu

jspm install
jspm bundle -m main.js build.js
cp -R index.html content/ app/ jspm_packages/ config.js main.js build.js ~/www/
