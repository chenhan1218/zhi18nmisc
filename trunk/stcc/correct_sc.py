#!/usr/bin/python
# -*- coding: utf-8 -*-

import codecs
import string

inf = codecs.open("core.tbl", "r", 'utf8')
outf = codecs.open("core2.tbl", "w", 'utf8')

c = 0
line = inf.readline()
while line != '':
    c = c + 1
    words = string.split(line, ',')
    if len(words) < 2:
        print c 
        continue
    words[1] = string.replace(words[1],
                              unicode(sys.argv[1]),
                              unicode(sys.argv[2])
    line = string.join(words, ',')
    outf.write(line)
    line = inf.readline()
inf.close()
outf.close()
