# frontend
```Bash
docker build -t kaiweimo/spotify-rewind-frontend ../client
docker push kaiweimo/spotify-rewind-frontend

docker run -d -p 3000:3000 kaiweimo/spotify-rewind-frontend
docker run -d -p 3000:3000 --pull always kaiweimo/spotify-rewind-frontend
```

# backend
```Bash
docker build -t kaiweimo/spotify-rewind-backend ../server
docker push kaiweimo/spotify-rewind-backend

docker run -d -p 8888:8888 kaiweimo/spotify-rewind-backend
docker run -d -p 8888:8888 --pull always kaiweimo/spotify-rewind-backend
```

# nginx
- https://www.youtube.com/watch?v=ehITvx8VPFI
```Bash
sudo apt-get install nginx -y
sudo rm /etc/nginx/sites-available/default
sudo touch /etc/nginx/sites-available/default

sudo tee -a /etc/nginx/sites-available/default > /dev/null <<EOT
server {
  listen 80;
  server_name spotifyrewind.dev;
  return 301 https://\$host\$request_uri;
}

server {
  listen 443 ssl;

  server_name spotifyrewind.dev;
  ssl_certificate /etc/letsencrypt/live/spotifyrewind.dev/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/spotifyrewind.dev/privkey.pem; # managed by Certbot

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

  location / {
    proxy_pass http://172.31.8.16:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
  }
}

server {
  listen 8889 ssl;

  server_name spotifyrewind.dev;
  ssl_certificate /etc/letsencrypt/live/spotifyrewind.dev/fullchain.pem; # managed by Certbot
  ssl_certificate_key /etc/letsencrypt/live/spotifyrewind.dev/privkey.pem; # managed by Certbot

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers on;
  ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

  location / {
    proxy_pass http://172.31.8.16:8888;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
  }
}
EOT

sudo systemctl restart nginx
```

# certbot
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
```Bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
  # spotifyrewind.dev
```

# misc
- https://askubuntu.com/a/235349
