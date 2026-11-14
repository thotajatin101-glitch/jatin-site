# python3 diff.py <dir>  → per frame pair: share of the screen that changed hard, and where (8x12 grid)
import sys,glob
from PIL import Image,ImageChops
fs=sorted(glob.glob(sys.argv[1]+'/*.png')); prev=None
for f in fs:
    im=Image.open(f).convert('L').resize((390,int(390*Image.open(f).height/Image.open(f).width)))
    if prev is not None and prev.size==im.size:
        d=ImageChops.difference(prev,im).point(lambda v:255 if v>40 else 0)
        gw,gh=8,12;cw,ch=im.width//gw,im.height//gh;rows=[]
        tot=sum(d.getdata())/255/(im.width*im.height)
        for y in range(gh):
            r=''
            for x in range(gw):
                c=d.crop((x*cw,y*ch,(x+1)*cw,(y+1)*ch));v=sum(c.getdata())/255/(cw*ch)
                r+=' .:-=+*#%@'[min(9,int(v*20))]
            rows.append(r)
        print(f[-6:-4],'%5.1f%%'%(tot*100),'|'.join(rows))
    elif prev is not None: print(f[-6:-4],'size',prev.size,'->',im.size)
    prev=im
