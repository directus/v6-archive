#!/usr/bin/env bash

# Directus installation path
DIR=/var/www/html
PROJECT_NAME='directus'
PROJECT_DIR="$DIR/$PROJECT_NAME"

# make directus directory
sudo mkdir $PROJECT_DIR

get_directus(){
  if [ ! -d "$PROJECT_DIR/.git" ]; then
    # can't git clone on a non-empty directory
    git clone https://github.com/directus/directus.git $PROJECT_DIR
    pushd $PROJECT_DIR
      composer install
    popd
  fi
}

install_directus() {
  DIRECTUS_CLI=$PROJECT_DIR/bin/directus
  php $DIRECTUS_CLI install:config -h localhost -u root -p 123 -n directus
  php $DIRECTUS_CLI install:database
  php $DIRECTUS_CLI install:install -e admin@getdirectus.com -p password -t "Directus Demo"
}

apt-get update
composer self-update

get_directus
install_directus
