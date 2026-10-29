import sys, collections
rows=[l.rstrip('\n').split('\t') for l in open(sys.argv[1],encoding='utf-8')][1:]
by=collections.defaultdict(list)
for r in rows: by[int(r[0])].append(r)
for v,s in enumerate(sorted(by),1):
    out=[]
    for r in by[s]:
        x,y,w,h=map(float,r[3:7])
        if r[2]=='text item' and y<175 and x<200 and x>-100:
            out.append(f"#{r[1]}({x:.0f},{y:.0f},{w:.0f}x{h:.0f},{r[7]}){r[8][:14]}")
    print(v,s,' '.join(out))
