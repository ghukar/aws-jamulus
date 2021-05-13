[Unit]
Description=Jamulus-Central-Server
After=network.target
[Service]
Type=simple
User=jamulus
NoNewPrivileges=true
ProtectSystem=true
ProtectHome=true
Nice=-20
IOSchedulingClass=realtime
IOSchedulingPriority=0
# This line below is what you want to edit according to your preferences
ExecStart=/usr/local/bin/llcon-jamulus/Jamulus --server --nogui \
--log /var/log/jamulus/jamulus.log \
--serverinfo "JamulusServer;Frankfurt;82" \
--welcomemessage "<h2>Welcome to Mosaik Berlin's Jamulus server</h2>" \
--numchannels 30
# end of section you might want to alter
Restart=on-failure
RestartSec=30
StandardOutput=journal
StandardError=inherit
SyslogIdentifier=jamulus
[Install]
WantedBy=multi-user.target
