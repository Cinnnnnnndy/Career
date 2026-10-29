# Keynote AppleScript gotchas and fixes

## Variable names
- `it` is reserved: `set it to iWork item k` fails with "access not allowed". Use `x`.
- `text items of t` inside `tell application "Keynote"` is read as Keynote's *text item* class. Do string splitting in a handler outside the tell block:
  ```applescript
  on flat(t)
    set AppleScript's text item delimiters to {return, linefeed, tab}
    set L to text items of t
    set AppleScript's text item delimiters to "⏎"
    set r to L as text
    set AppleScript's text item delimiters to ""
    return r
  end flat
  ```

## Reading position
- `item 2 of (position of x)` sometimes fails to coerce. Read it into a variable first: `set p to position of x` then `item 2 of p`.
- `text item 4 of s` counts only text items; `iWork item 4 of s` counts all items. Dumps use iWork item indexes, so use those.

## Text styling
- Whole-text style: `set size/font/color of object text of x to …`. Colours are 16-bit RGB: multiply 8-bit values by 257.
- Single characters: `set color of character 1 of object text of x to {r,g,b}`, e.g. a coloured "●" bullet. Set the font of the whole text afterwards too, or a bullet in a different font renders smaller.
- Hanging indent without paragraph styles: break the line with `return`, then indent the continuation with a full-width space (`character id 12288`) plus one normal space. That roughly matches the width of "● ".
- Alignment can't be set; text boxes keep whatever alignment they had. When widening a right-aligned label, move its x left by the same amount.

## Creating objects
- `make new image` must be addressed inside `tell s` (the slide), with an alias: `make new image with properties {file:(POSIX file "/abs/path.png" as alias), position:{x,y}, width:w, height:h}`. Keynote may not read the image from sandboxed temp folders; copy it into the project folder first.
- `make new text item with properties {object text:"…", position:{…}, width:…}`, then set font, size and colour.
- Reuse existing styled images (pill PNGs, icons) from the .key package: it is a zip. `unzip -l deck.key | grep Data/` lists them. Use Python `zipfile` to extract when names contain CJK characters (unzip fails with "Illegal byte sequence").
- A new object goes on top of the z-order and can't be reordered by script. Create the background object first, then the text above it.

## What does NOT work
- `duplicate shape …` → "Shapes can not be copied".
- Shape fill colour, corner radius, stroke: no scripting property.
- `duplicate slide 1 of docA to after slide n of docB` → "connection invalid". Use the GUI copy/paste route in SKILL.md §6.

## Export
- Whole deck: `export d to POSIX file dir as slide images with properties {image format:PNG, skipped slides:false}`, which writes `<dir>.001.png …`.
- PDF: `export d to POSIX file "…pdf" as PDF with properties {PDF image quality:Best, skipped slides:false}`.
- Wrap long exports in `with timeout of 1800 seconds … end timeout`; the default AppleEvent timeout (2 min) is too short for big decks.
- When `osascript` runs longer than the shell tool's limit, run it in the background. Keynote stays responsive to small queries meanwhile, so you can check progress by probing a value the script should have changed.

## Images and contact sheets
- If PIL fails with "incompatible architecture" on Apple Silicon, the user's site-packages is x86. Run with `arch -x86_64 /usr/bin/python3`.

## Recovery
- After a Keynote crash or relaunch, scripts may fail with "can't get every document" even though windows are visible. System Events still works:
  - `value of attribute "AXDocument" of every window` gives each window's file;
  - the window's static text "已编辑" / "Edited" marks unsaved changes.
  
  Report this to the user and ask them to quit and reopen Keynote. Don't quit it yourself while any window shows unsaved edits.
