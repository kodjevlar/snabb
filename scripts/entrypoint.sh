if [ "$NODE_ENV" = "production" ]; then
  echo "Running in production mode..."
elif [ "$NODE_ENV" = "development" ]; then
  echo "Running in development mode. Installing dev-dependencies..."
  npm install
fi

npm start
