#!/bin/bash

set -eu

jspm bundle main.js --inject -m
cp -R index.html app/ jspm_packages/ config.js main.js build.js ~/www/