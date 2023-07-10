# Stage 1: Build the Svelte application
FROM node:18 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# forward port 5173
EXPOSE 5173


# run the svelte app
ENTRYPOINT [ "npm", "run", "dev", "--", "--host" ]
