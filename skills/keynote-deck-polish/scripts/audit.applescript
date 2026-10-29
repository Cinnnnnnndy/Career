-- usage: osascript audit.applescript /abs/out.tsv   (all visible slides of the front document)
on run argv
set outPath to item 1 of argv
set out to ""
tell application "Keynote"
  set d to front document
  set out to out & "SIZE" & tab & (width of d) & tab & (height of d) & linefeed
  repeat with i from 1 to count of slides of d
    set s to slide i of d
    if skipped of s is false then
      set n to count of iWork items of s
      repeat with k from 1 to n
        set x to iWork item k of s
        set c to class of x as text
        set p to position of x
        set t to ""
        try
          set t to object text of x as text
        end try
        set fs to ""
        try
          set fs to size of object text of x
        end try
        set t to my flat(t)
        set out to out & i & tab & k & tab & c & tab & (item 1 of p) & tab & (item 2 of p) & tab & (width of x) & tab & (height of x) & tab & fs & tab & t & linefeed
      end repeat
    end if
  end repeat
end tell
set fh to open for access (POSIX file outPath) with write permission
set eof of fh to 0
write out to fh as «class utf8»
close access fh
return "done"
end run
on flat(t)
  set AppleScript's text item delimiters to {return, linefeed, tab}
  set L to text items of t
  set AppleScript's text item delimiters to "⏎"
  set r to L as text
  set AppleScript's text item delimiters to ""
  return r
end flat
