#!/bin/bash
rm -fr ./docs
npm run generate
mv ./dist ./docs