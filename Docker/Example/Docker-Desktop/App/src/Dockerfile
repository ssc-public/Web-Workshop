# FROM debian:latest
From nginx:latest
From node:latest

RUN mkdir -p /app/src
# creating the src directory inside the container 

WORKDIR /app/src
#defining /app/src as the working directory of the app

COPY package.json .
# . = /app/src = work directory

COPY . .
#copies everything to the workdir in the container

RUN yarn install

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
#the port it uses to listen! 

CMD ["yarn", "start"]
#the command to start the app

#use docker build {path to this file's directory} -t {tag name for app} 