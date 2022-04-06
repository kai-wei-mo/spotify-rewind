# frontend
```Bash
sudo docker build -t kaiweimo/spotify-rewind-frontend ../client
sudo docker push kaiweimo/spotify-rewind-frontend

sudo docker run -d -p 3000:3000 kaiweimo/spotify-rewind-frontend
sudo docker run -d -p 3000:3000 --pull always kaiweimo/spotify-rewind-frontend
```

# backend
```Bash
sudo docker build -t kaiweimo/spotify-rewind-backend ../server
sudo docker push kaiweimo/spotify-rewind-backend

sudo docker run -d -p 8888:8888 kaiweimo/spotify-rewind-backend
sudo docker run -d -p 8888:8888 --pull always kaiweimo/spotify-rewind-backend
```
