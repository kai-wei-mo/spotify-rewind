FROM node:latest AS builder

WORKDIR /app

COPY package.json .
RUN npm install

COPY . ./
RUN npm run build

CMD ["npm", "start"]

# https://stackoverflow.com/a/60822277
# https://medium.com/greedygame-engineering/so-you-want-to-dockerize-your-react-app-64fbbb74c217

# docker build -t kaiweimo/spotify-rewind-frontend .
# docker push kaiweimo/spotify-rewind-frontend
# docker run -d -p 443:3000 --pull always kaiweimo/spotify-rewind-frontend
