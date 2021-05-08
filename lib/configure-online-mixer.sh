echo [USER DATA] update packages
sudo apt update
echo y | sudo apt install ubuntu-desktop
sudo apt install tightvncserver
echo y | sudo apt install gnome-panel gnome-settings-daemon metacity nautilus gnome-terminal

vncserver :1
vim ~/.vnc/xstartup



echo [USER DATA] install dependencies
echo yes | sudo apt install tasksel

echo [USER DATA] install Ubuntu Studio
sudo tasksel install ubuntustudio-desktop

echo [USER DATA] Install VNC Server
sudo apt install tightvncserver
