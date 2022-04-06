# preferences
git clone https://github.com/kai-wei-mo/dotfiles
bash dotfiles/install.sh

# nginx
sudo apt install nginx -y

sudo mkdir /var/www/spotifyrewind.dev

sudo chmod -R 755 /var/www/spotifyrewind.dev
sudo chown -R ubuntu:www-data /var/www/spotifyrewind.dev

sudo touch /etc/nginx/sites-available/spotifyrewind.dev

sudo tee -a /etc/nginx/sites-available/spotifyrewind.dev > /dev/null <<EOT
server { 
    listen 80;
    listen [::]:80;

    root /var/www/spotifyrewind.dev; 
    index index.html;
}
EOT

sudo unlink /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/spotifyrewind.dev /etc/nginx/sites-enabled/spotifyrewind.dev

sudo service nginx restart

# check upload
cd /var/www/spotifyrewind.dev
ls
