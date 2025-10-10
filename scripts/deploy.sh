#!/bin/bash
rm -fr ./.output
npm run generate
mv .output/public ./docs