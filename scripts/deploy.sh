#!/bin/bash
rm -fr ./docs
npm run generate
cp -r .output/public ./docs
touch ./docs/.nojekyll
git add ./
git commit -am "Update GH Pages build."
git push