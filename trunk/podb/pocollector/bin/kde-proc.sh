
# useage: $0 languagename

cd KDE/kde-i18n/$1/messages || exit

#find * | grep -e po$ | awk 'BEGIN { FS = ".po" } {print $1}' 

find * | grep -e po$ | awk -v LANGT=$1 'BEGIN { FS = "\.po" } {print "po2sql KDE/kde-i18n/" LANGT "/messages/" $1 ".po KDE " $1 " " LANGT " | mysql podb || echo fail at " $1}' 

