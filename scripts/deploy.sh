#!/bin/bash

# Generate static website
rm -fr ./docs
npm run generate
npx ipx generate public ./.output/public/_ipx
cp -r ./.output/public ./docs

# Disable GitHub Jekyll
touch ./docs/.nojekyll

# Commit and Push changes
git add ./
git commit -am "Update GH Pages build."
git push