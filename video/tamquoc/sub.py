import sys

assert(len(sys.argv)==2)

PATH=''
number=sys.argv[1]

with open(PATH+number+'o.vtt', 'r') as f:
    lines = f.readlines()
    # lines = [line.rstrip() for line in f]

for i, line in enumerate(lines):
    if '-->' in line:
        if line.endswith('.000\n'):
            lines[i]=line[:-7]+str(int(line[-7:-5])-1)+'.999\n'
        else:
            lines[i]=line[:-4]+str(int(line[-4:-1])-1).zfill(3)+'\n'
    else:
        lines[i] = line.replace('<b>','').replace('</b>','')

print(len(lines))

with open(PATH+number+'.vtt', 'w') as f:
    f.writelines(lines)

# import re
# with open('../../a.html', 'r+') as f:
#     lines = f.readlines()
#     for i,line in enumerate(lines):
#         if re.search('video/tamquoc/\d+\.', line):
#             lines[i]=re.sub('\d+\.',number+'.',line)
#     f.seek(0)
#     f.writelines(lines)