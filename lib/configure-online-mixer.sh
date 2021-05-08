echo [USER DATA] update packages
sudo apt-get update

# Explained here: https://www.youtube.com/watch?v=MRuIhPwiYow&list=WL&index=24&t=266s
echo [USER DATA] install Ubuntu Desktop
echo y | sudo apt install xrdp
sudo systemctl enable xrdp
sudo add-apt-repository ppa:gnome3-team/gnome3
echo y | sudo apt-get install gnome-shell
sudo passwd ubuntu
sudo apt install net-tools
sudo apt-get install ardour jackd jamulus
sudo reboot

# Download Ardour and install it using 'chmod +x [/path/to/ardour-file]'
# 1. Download the latest .deb file https://github.com/jamulussoftware/jamulus/releases/download/r3_7_0/jamulus_3.7.0_ubuntu_amd64.deb
# 2. Install the package: sudo apt install /path/to/jamulus_3.7.0_ubuntu_amd64.deb.
# 3. Since Jamulus needs the JACK server, you have to install it too. We recommend to use QjackCtl to configure JACK. You can install it via sudo apt-get install qjackctl
# 4. run sudo reboot

# additional help can be found here: https://superuser.com/questions/344760/how-to-create-a-dummy-sound-card-device-in-linux-server
# and here https://www.alsa-project.org/wiki/Matrix:Module-dummy

# Aditional commands
# sudo -i -u root  # to elevate privileges when compiling code
# sudo netstat -tunlp   # to find the remote desktop port; I need this to create a security group for remote connections

# Check also Jamulus command line options: https://jamulus.io/de/wiki/Command-Line-Options
# with 'jamulus -c [IP]' you can directly connect to the server
