sh bin/kde-list-lang.sh | awk '{print "sed -e s/potb/potb_" $1 "/ ../po2sql/podb.sql"  }' | sh
