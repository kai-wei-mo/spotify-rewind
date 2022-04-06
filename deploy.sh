echo "🏁 switching to main branch"
# git checkout main
git pull

echo "🏁 building app"
cd client
npm run build
cd ..

echo "🏁 deploying to server"
scp -i ~/.ssh/spotify-rewind-kp.pem -r client/build/* ubuntu@spotifyrewind.dev:/var/www/spotifyrewind.dev/

echo "🏁 done"
