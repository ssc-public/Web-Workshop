# FROM debian:latest
From node:latest

RUN mkdir -P /app/src
# creating the src directory inside the container 

WORKDIR /app/src
#defining /app/src as the working directory of the app

COPY package.json .
# . = /app/src = work directory

RUN yarn install

COPY . .
#copies everything inside this directory to the workdir in the container

EXPOSE 3000
#the port it uses to listen! 

CMD "node index.js" 
#the command to start the app

#use docker build {path to this file's directory} -t {tag name for app} 