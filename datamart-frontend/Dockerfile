FROM node:20.10.0-alpine

# Set the working directory
WORKDIR /app

#ENV PATH /app/node_modules/.bin:$PATH

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the app files
COPY . .

# Build the app
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Run the app
#CMD ["npm", "start"]
CMD serve -s build
