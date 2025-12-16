@echo off

:: Set PATH for executables
set "PATH=%CD%\Angular\.cache\nodejs\node-v24.11.1-win-x64\;%PATH%"

:: Set working directory
set wd=%~dp0
cd /d "%wd%"
cd Angular

:: Run node with the provided arguments
node %*

:: Return to the initial directory
cd /d "%wd%"