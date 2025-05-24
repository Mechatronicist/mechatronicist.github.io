#!/bin/bash
npm run build
echo "Formatting files for GitHub pages.."
mv "./dist" "./docs"
echo "Done."