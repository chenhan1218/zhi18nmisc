
cd KDE/messages

#find * | grep -e po$ | awk 'BEGIN { FS = ".po" } {print $1}' 

find * | grep -e po$ | awk 'BEGIN { FS = "\.po" } {print "./po2sql/po2sql KDE/messages/" $1 ".po KDE " $1 " | mysql podb || echo fail at " $1}' 

