#!/bin/bash

set -eu

jspm install
jspm bundle -m src/main.js
cp -R index.html content/ src/ jspm_packages/ jspm.config.js jspm.browser.js build.js build.js.map ~/www/
