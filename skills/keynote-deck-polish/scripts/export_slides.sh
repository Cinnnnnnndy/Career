#!/bin/zsh
# Export slide PNGs from the front Keynote document.
# usage:
#   export_slides.sh all <out_dir>            # every visible slide (safe, no state change)
#   export_slides.sh one <slide_index> <out.png>  # a single slide (temporarily skips others, always restores)
# Notes:
# - "one" mode toggles `skipped` on every slide, then restores the exact original states,
#   even if the export fails. Run it only when the document has no unsaved user edits.
# - Large decks: allow a long timeout (export of 40+ slides can take minutes).
set -e
MODE=$1
APP=${KEYNOTE_APP:-Keynote}
if [[ $MODE == all ]]; then
  OUT=$2; mkdir -p "$OUT"
  osascript -e "with timeout of 1800 seconds
tell application \"$APP\" to export front document to POSIX file \"$OUT\" as slide images with properties {image format:PNG, skipped slides:false}
end timeout"
  exit 0
fi
IDX=$2; OUTPNG=$3
TMP=$(mktemp -d "${TMPDIR:-/tmp}/kn_exp.XXXX")
osascript <<EOF
with timeout of 1800 seconds
tell application "$APP"
  set d to front document
  set n to count of slides of d
  set sk to {}
  repeat with i from 1 to n
    set end of sk to skipped of slide i of d
  end repeat
  try
    repeat with i from 1 to n
      set skipped of slide i of d to (i is not $IDX)
    end repeat
    export d to POSIX file "$TMP" as slide images with properties {image format:PNG, skipped slides:false}
    set err to ""
  on error e
    set err to e
  end try
  repeat with i from 1 to n
    set skipped of slide i of d to item i of sk
  end repeat
  if err is not "" then error err
end tell
end timeout
EOF
mv "$TMP"/*.png "$OUTPNG"; rmdir "$TMP"
