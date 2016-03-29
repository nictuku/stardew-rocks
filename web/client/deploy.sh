#!/bin/bash

set -eu

release_env="${1:-dev}"
rootdir="${HOME}/www-${release_env}"

ts="$(date +%s)"
dest="$rootdir/assets/$ts"
echo "Deploying to $dest .."

jspm install
jspm bundle -m src/main.js

mkdir -p "${dest}"

tmpdest="$(mktemp -d)"

# "content" is currently using an absolute directory, so don't copy it.
cp -R index.html src/ jspm_packages/ jspm.config.js jspm.browser.js build.js build.js.map "${tmpdest}"

# "content" is currently using an absolute directory
# This changes the live stuff.
# TODO: use versioning for the entire www directory.
cp content/* "${rootdir}/content"

sed -e "s#src=\"#src=\"assets/${ts}/#"  -i ${tmpdest}/*html
sed -e "s#baseURL: \"/\"#baseURL: \"/assets/${ts}/\"#" -i "${tmpdest}/jspm.browser.js"

mv ${tmpdest}/* "${dest}"

tmp=$(mktemp)
sed -e "s#DirectoryIndex .*html#DirectoryIndex assets/${ts}/index.html#" /etc/apache2/sites-available/${release_env}.conf > "${tmp}"

cp "${tmp}" /etc/apache2/sites-available/${release_env}.conf
