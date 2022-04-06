FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . ./

CMD ["npm", "run", "server"]

# docker build -t kaiweimo/spotify-rewind-backend .
# docker push kaiweimo/spotify-rewind-backend
# docker run -d -p 8888:8888 --pull always kaiweimo/spotify-rewind-backend
