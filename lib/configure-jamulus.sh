# This file installs the Jamulus code, its dependencies, compiles the server
# and runs it as a server.
# It follow the instructions from this how to guide:
#   http://orangeblossomchorus.com/index.php/howto-idiots-guide-to-installing-jamulus-server-on-amazon-aws-lightsail-ubuntu-instance

# I set up the Lightsail server with Ubuntu 18.0.4 and with the name:
#   JamulusTestServer

git clone https://github.com/corrados/jamulus.git llcon-jamulus
sudo apt update

# need to figure out how to send a 'Y' and 'Enter' to this command
sudo apt-get install build-essential qt5-qmake qtdeclarative5-dev libjack-jackd2-dev qt5-default

cd llcon-jamulus
qmake "CONFIG+=nosound" Jamulus.pro

make clean
make
cd

# This moves the jamulus directory into the ‘/usr/local/bin’ directory.
sudo mv llcon-jamulus/ /usr/local/bin

# We now need to create a non-privileged user to run the server as we don’t want to run it using our adminstrator privileges.
sudo adduser --system --no-create-home jamulus

# We need to make a log directory so that the jamulus logs are saved somewhere:
sudo mkdir /var/log/jamulus
sudo chown jamulus:nogroup /var/log/jamulus

# Create a start script for your server:
# need to figure out how to transfer a file to the EC2 machine and moves this into the appropriate folder
sudo vi /etc/systemd/system/jamulus.service

# Press 'i' and then copy 'server-settings.sh' into the console
# then press '[ESC]' then ':' then 'wq' then press 'enter'. This will take you back to the terminal prompt and your script has been saved.

# Let’s double check the script is correct:
cat /etc/systemd/system/jamulus.service

# Now give it executable permissions:
sudo chmod 644 /etc/systemd/system/jamulus.service

# Now start up the service
sudo systemctl start jamulus

# Check the syslog now:
cat /var/log/syslog

# To make sure your service runs when the instance is rebooted type this line:
sudo systemctl enable jamulus

# You can now close this window as your server is now running


# If you ever want to shutdown your server you can just issue the command:
# sudo systemctl stop jamulus
