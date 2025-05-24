#!/bin/bash
npm run build
echo "Formatting files for GitHub pages.."
rm -fr ./docs
cp -r "./dist" "./docs"
rm -fr ./dist
echo "Done."