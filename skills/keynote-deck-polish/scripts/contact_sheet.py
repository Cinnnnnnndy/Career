# usage: python3 contact_sheet.py <png_dir> <out_dir> <4|16>
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
src, out, per = sys.argv[1], sys.argv[2], int(sys.argv[3])
files = sorted(glob.glob(os.path.join(src, '*.png')))
cols = 2 if per == 4 else 4
w, h = (960, 540) if per == 4 else (480, 270)
rows = per // cols
os.makedirs(out, exist_ok=True)
try: font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 28)
except: font = None
for b in range(0, len(files), per):
    sheet = Image.new('RGB', (cols*w + (cols+1)*10, rows*h + (rows+1)*10), (120,120,120))
    for k, f in enumerate(files[b:b+per]):
        im = Image.open(f).convert('RGB').resize((w, h))
        x, y = 10 + (k % cols)*(w+10), 10 + (k//cols)*(h+10)
        sheet.paste(im, (x, y))
        ImageDraw.Draw(sheet).text((x+6, y+4), str(b+k+1), fill=(255,0,0), font=font)
    sheet.save(os.path.join(out, 'sheet_%02d.png' % (b//per+1)))
