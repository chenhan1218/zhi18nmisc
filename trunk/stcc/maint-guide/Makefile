all: zh_TW.html/index.html

tw.sgml: cn.sgml *.tbl
	../stcc -d maint-guide.tbl -d ../computer.tbl -d ../general.tbl -d ../character_s2t.tbl -d ../character.tbl -t $< $@

zh_TW.sgml: tw.sgml
	iconv -t BIG5 < $< > $@

zh_TW.html/index.html: zh_TW.sgml
	debiandoc2html -l zh_TW $<

clean:
	rm -rf tw*.sgml zh_TW.??ml
.PHONY: clean
