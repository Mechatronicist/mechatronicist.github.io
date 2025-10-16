@echo off
setlocal

echo Removing old docs folder...
if exist docs (
    rmdir /s /q docs
) else (
    echo No docs folder to remove.
)

echo Generating static site...
call npm run generate --prerender

echo Copying generated files to docs...
xcopy .output\public docs /E /I /Y

echo Creating .nojekyll file...
type NUL > docs\.nojekyll

echo Committing and pushing changes...
git add .
git commit -am "Update GH Pages build."
git push

echo Done!
pause
endlocal
