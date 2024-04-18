@echo off
set CONTAINER_NAME=mynode 
set PORT=3000
set IMAGE=node:lts-alpine3.19
set CMD=npm run dev
set HOST_VOLUME=D:\Projects\node.js\HomeWork\final-project
set CONTAINER_VOLUME=/app
set WORK_DIR=/app

docker run -it --rm --name %CONTAINER_NAME% -v %HOST_VOLUME%:%CONTAINER_VOLUME% -w %WORK_DIR% -p 80:3002 -e PORT=%PORT% %IMAGE% %CMD%