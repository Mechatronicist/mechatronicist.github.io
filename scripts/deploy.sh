#!/bin/bash
rm -fr ./docs
npm run generate
cp -r .output/public ./docs