awk 'BEGIN { FS = "="} NF == 2 {print $1}' KDE/kde-i18n/teamnames 
