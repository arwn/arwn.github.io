#!/bin/bash
fswatch -o `dirname $0` | xargs -n1 -I {} osascript -e 'tell application "Google Chrome" to tell the active tab of its first window to reload'
