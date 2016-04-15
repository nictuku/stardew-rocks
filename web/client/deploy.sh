#!/bin/bash

set -eu

release_env="${1:-dev}"
rootdir="${HOME}/www-${release_env}"

ts="$(date +%s)"
dest="$rootdir/assets/$ts"
echo "Deploying to $dest .."

npm install

webpack

karma start --single-run

mkdir -p "${dest}"

tmpdest="$(mktemp -d)"

# "content" is currently using an absolute directory, so don't copy it.
cp -R index.html bundle.js bundle.js.map favicon.ico favicon-152.png "${tmpdest}"

# "content" is currently using an absolute directory
# This changes the live stuff.
# TODO: use versioning for the entire www directory.
cp content/* "${rootdir}/content"

sed -e "s#src=\"#src=\"assets/${ts}/#"  -i ${tmpdest}/*html

mv ${tmpdest}/* "${dest}"

tmp=$(mktemp)
sed -e "s#assets/[0-9]\+/#assets/${ts}/#" \
	-e "s#DirectoryIndex .*html#DirectoryIndex assets/${ts}/index.html#" \
	/etc/apache2/sites-available/${release_env}.conf > "${tmp}"

cp "${tmp}" /etc/apache2/sites-available/${release_env}.conf
