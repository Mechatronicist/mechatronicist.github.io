#!/bin/bash

# Generate static website
rm -fr ./docs
npm run generate --prerender
cp -r ./.output/public ./docs

# Disable GitHub Jekyll
touch ./docs/.nojekyll

# Commit and Push changes
git add ./
git commit -am "Update GH Pages build."
git push