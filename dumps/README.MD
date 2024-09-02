1) Voir Powerpoint WNS - Sécuriser ses données
2) Générer un dump (PgSQL)
      - Donner un nom à son container PostgreSQL
      -  Définir un dossier qui contiendra les sauvegardes (/ dump)
      - Générer un dump SQL avec : 
      docker exec containerName pg_dumpall -c -U dbUserName > ./pg_`date +%Y-%m-%d"_"%H-%M-%S`.sql
      docker exec 0898434343678ehfejhfjk6T364DHHDGtfhfh866 pg dumpall -c -U postgres > > ./pg_`date +%Y-%m-%d"_"%H-%M-%S`.sql
3) Stocker le dump autre part
      - Installer rclone
      - rclone config
      - Synchroniser le dossier avec : rclone sync . remoteName:dumps