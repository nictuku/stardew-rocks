Logs are saved to two files:
/var/log/stardew/server.log and /var/log/stardew/access.log


You have to create /var/log/stardew and give your user ownership to that directory.

For production, I run the following as root:

mkdir stardew /var/log/stardew
chown stardew /var/log/stardew

