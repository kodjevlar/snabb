FROM node:6.5

ARG PROJECT_DIR=/usr/src/app

# Service directory
RUN mkdir /usr/src/app
WORKDIR $PROJECT_DIR

# Install dependencies
COPY package.json $PROJECT_DIR/
RUN npm install

# Bundle source
COPY . $PROJECT_DIR

# Build web application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
