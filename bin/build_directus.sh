rm -rf .directus-build
git clone https://github.com/directus/directus.git .directus-build

pushd .directus-build
    npm install
    git checkout 6.3.x
    gulp build
    gulp deploy
popd

rm -rf .directus-build
