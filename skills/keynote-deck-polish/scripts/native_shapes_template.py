"""Build a slide from native, editable shapes with python-pptx, then bring it into Keynote.

Why: Keynote's AppleScript cannot set shape fill colour, corner radius or strokes, and cannot
copy shapes. A PPTX opened in Keynote becomes real Keynote shapes with all of that styling.

Units: the deck is 1920x1080 in Keynote "points", so size the PPTX in Pt(1920) x Pt(1080)
and use Pt() for every coordinate and font size. Then numbers match Keynote 1:1.

Usage: python3 native_shapes_template.py out.pptx   (needs python-pptx; on Apple Silicon with an
x86-only install, run under `arch -x86_64 /usr/bin/python3`).
Then follow "Native shapes" in SKILL.md to paste into the deck.
"""
import sys
from pptx import Presentation
from pptx.util import Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.dml import MSO_LINE_DASH_STYLE

FONT = 'PingFang SC'
prs = Presentation(); prs.slide_width = Pt(1920); prs.slide_height = Pt(1080)
s = prs.slides.add_slide(prs.slide_layouts[6])

def rgb(h): return RGBColor.from_string(h.lstrip('#'))

def text_width(t, size):
    """Rough width estimate for sizing pills: CJK = 1em, Latin ~0.56em, caps ~0.68em, space 0.3em."""
    w = 0
    for ch in t:
        if ord(ch) > 0x2E80: w += size
        elif ch == ' ': w += size * 0.3
        elif ch.isupper(): w += size * 0.68
        else: w += size * 0.56
    return w

def box(x, y, w, h, fill=None, r=0, line=None, dash=False):
    """Rounded rect. r = corner radius in pt; r >= h/2 gives a pill."""
    shp = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if r else MSO_SHAPE.RECTANGLE, Pt(x), Pt(y), Pt(w), Pt(h))
    if r: shp.adjustments[0] = min(0.5, r / min(w, h))
    if fill: shp.fill.solid(); shp.fill.fore_color.rgb = rgb(fill)
    else: shp.fill.background()
    if line:
        shp.line.color.rgb = rgb(line); shp.line.width = Pt(2)
        if dash: shp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    else: shp.line.fill.background()
    shp.shadow.inherit = False
    return shp

def text(target, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.MIDDLE, inset=(0, 0, 0, 0), gap=0):
    """paras = [[(text, size, '#hex', bold), ...], ...]; target = shape or (x, y, w, h) for a text box."""
    shp = s.shapes.add_textbox(*[Pt(v) for v in target]) if isinstance(target, tuple) else target
    tf = shp.text_frame; tf.word_wrap = True; tf.vertical_anchor = anchor
    tf.margin_left, tf.margin_top, tf.margin_right, tf.margin_bottom = [Pt(v) for v in inset]
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if gap and i: p.space_before = Pt(gap)
        for t, size, color, bold in para:
            r = p.add_run(); r.text = t
            f = r.font; f.size = Pt(size); f.name = FONT; f.bold = bold; f.color.rgb = rgb(color)
    return shp

# Full-bleed background rectangle FIRST: copy/paste moves objects, not the slide background.
box(0, 0, 1920, 1080, '#F3F4F8')

# --- example content: replace with the real layout ---
text((65, 86, 1200, 66), [[('Page title', 44, '#0F1729', True)]], anchor=MSO_ANCHOR.TOP)
card = box(154, 184, 1327, 127, '#0F1729', 24)
text(card, [[('Card title', 40, '#FFFFFF', True)], [('Card subtitle', 24, '#B6BECC', False)]], align=PP_ALIGN.CENTER, gap=6)
x = 154
for word in ['Tag A', 'Tag B']:
    w = text_width(word, 24) + 24
    text(box(x, 340, w, 38, '#FFFFFF', 19), [[(word, 24, '#0F1729', False)]], align=PP_ALIGN.CENTER)
    x += w + 8

prs.save(sys.argv[1])
