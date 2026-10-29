-- usage: osascript dump_slide.applescript <slide_index>
-- Prints presenter notes and every item on the slide: index, class, [x,y wxh], text.
-- Item indexes are what other scripts use ("iWork item k of slide n"); they shift when items are added.
on run argv
	set idx to (item 1 of argv) as integer
	tell application "Keynote"
		set s to slide idx of front document
		set out to "notes: " & (presenter notes of s) & linefeed
		repeat with k from 1 to count of iWork items of s
			set x to iWork item k of s
			set p to position of x
			set t to ""
			try
				set t to object text of x
			end try
			set out to out & k & " " & (class of x as text) & " [" & ((item 1 of p) as integer) & "," & ((item 2 of p) as integer) & " " & ((width of x) as integer) & "x" & ((height of x) as integer) & "] " & t & linefeed
		end repeat
		return out
	end tell
end run
