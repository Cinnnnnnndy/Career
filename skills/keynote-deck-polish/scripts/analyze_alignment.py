# usage: python3 analyze_alignment.py audit.tsv   (TSV from audit.applescript). Margins assume 1920 wide, 47 side margin.
import sys, collections
rows=[l.rstrip('\n').split('\t') for l in open(sys.argv[1],encoding='utf-8')][1:]
by=collections.defaultdict(list)
for r in rows:
    s,k,c,x,y,w,h,fs,t=r[0],int(r[1]),r[2],float(r[3]),float(r[4]),float(r[5]),float(r[6]),r[7],r[8]
    by[int(s)].append((k,c,x,y,w,h,fs,t))
vis=sorted(by)
for v,s in enumerate(vis,1):
    items=[i for i in by[s] if -500<i[2]<1920 and -500<i[3]<1080]
    notes=[]
    for k,c,x,y,w,h,fs,t in items:
        if fs and float(fs)<16 and t.strip(): notes.append(f"small{fs}:{k}:{t[:12]}")
        if x+w>1880 and x+w<2000 and w<1800: notes.append(f"R>{x+w:.0f}:{k}")
        if 30<x<47 or 47<x<60: notes.append(f"L{x:.0f}:{k}:{c[:4]}:{t[:8]}")
    # near-equal left edges and tops
    for attr,name in ((2,'x'),(3,'y')):
        vals=sorted(set(round(i[attr]) for i in items))
        for a,b in zip(vals,vals[1:]):
            if 0<b-a<=4: notes.append(f"{name}{a}/{b}")
    # right edges
    rs=sorted(set(round(i[2]+i[4]) for i in items))
    for a,b in zip(rs,rs[1:]):
        if 0<b-a<=4: notes.append(f"r{a}/{b}")
    print(v,s,' | '.join(notes)[:900])
