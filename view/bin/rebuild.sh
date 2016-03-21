#!/bin/bash

set -eu
for x in ~/www/saveGames/*; do
  f="$HOME/www/map-$(basename $x .xml).png"

  ./bin $x $f

done
