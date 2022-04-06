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
sudo apt-get install nginx
sudo rm /etc/nginx/sites-available/default
sudo touch /etc/nginx/sites-available/default

sudo tee -a /etc/nginx/sites-available/default > /dev/null <<EOT
server {
  listen       443;

  location / {
    proxy_pass http://172.31.91.6:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_cache_bypass \$http_upgrade;
  }
}
EOT
```

# certbot
- https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal
```Bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```
