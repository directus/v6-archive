# api-client-spec

The swagger spec for the Directus API clients, and the build system for the client SDKs.

## How to build

Run build.sh, docker must be installed and runnable via the current user. Look in sdks directory after build completes.

## How it works

We spin up a docker container, check out the latest version of swagger codegen, apply patches from configs/ directory, build all applicable client packages, start the container, copy files out of container, and finally remove the container.

## Info on client packages

Each client package will generate its own readme and set of documentation upon successful build

