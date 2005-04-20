all: zh_TW.html/index.html zh_CN.html/index.html

tw.sgml: cn.sgml *.tbl
	../stcc -d maint-guide.tbl -d ../computer.tbl -d ../general.tbl -d ../character_s2t.tbl -d ../character.tbl -t $< $@

zh_TW.sgml: tw.sgml
	iconv -t BIG5 < $< > $@

zh_TW.html/index.html: zh_TW.sgml
	debiandoc2html -l zh_TW $<

zh_CN.sgml: cn.sgml
	cat cn.sgml | iconv -f utf8 -t gb2312 > zh_CN.sgml

zh_CN.html/index.html: zh_CN.sgml
	debiandoc2html -l zh_CN $<

clean:
	rm -rf tw*.sgml zh_*
.PHONY: clean
