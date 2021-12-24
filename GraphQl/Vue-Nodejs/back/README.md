# Implementing GraphQl server with node js
an image go here
## How to start
1. create a new directory and navigate to it
2. initialize node js project. If you don't know how does the following commad work, visit [this page](https://docs.npmjs.com/cli/v8/commands/npm-init) 
```
npm init --yes
```
3. as you know we want to work with GraphQl and Apollo Server so we need to install dependecies
```
npm install apollo-server graphql
```
4. create an index.js file in root of project
5. define your GraphQl schema in index.js as explained in video
6. for our example we hard code our data
7. define resolver in index.js as explained in video
8. GraphQl doesnt have diffrent routes like REST API (get, post, delete, ...). It only has two routes. If you want to changing the state of in GraphQl Server you should sent it through a mutations so we modify our mutation in index.js as explained in video
9. create an instance of Apollo Server as explained in video
10. run your server
```
node index.js
```
10. finally you server is ready at given url in console
