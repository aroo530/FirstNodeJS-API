<h1> welcome to project 1 image API </h1>
I'll not waste your time here

entry point to application.
http://localhost:3000/api/
example url for application.
http://localhost:3000/api/?filename=call.png&width=100&height=300
image examples (are in the full folder)
call.png
callback.png
functions.png
output.png

the api will return the image if and only if 
    the image is in the full folder
    the width and height are over 50 


npm run:

<h2> don't forget npm install to get all dependencies </h2>
    <small>run jasmine test on the latest build</small>
    <p style="font-weight:bold;">"test": "npm run build && npm run jasmine"</p>
    <small>run jasmine on existing build</small>
    <p style="font-weight:bold;">"jasmine": "jasmine"</p>
    <small>build to convert the typescript to javascript</small> 
    <p style="font-weight:bold;">"build": "npx tsc"</p>
    <small>run the typescript build</small>
    <p style="font-weight:bold;">"TSstart": "nodemon src/app.ts"</p>
    <small>run the javavScript build</small>
    <p style="font-weight:bold;">"JSstart": "npm run build && nodemon build/app.js"</p>

I didn't use eslint nor prettier configs and scripts since my IDE has support for them

the project is over organized and full of directories but u required scallable project so this should do the trick

project structure:

    ├───.vscode

<<<<<<< HEAD
so here are all the sourced images remember that if the dimensions change the api will create a new one  
├───images
│ ├───full
│ └───thumbs
=======
    so here are all the sourced images remember that if the dimensions change the api will creatte a new one  
    ├───images
    │ ├───full
    │ └───thumbs
>>>>>>> 411137b3748e83339c082f4e2a19d3c4872f1aa7

    here is the jasmine config
    ├───spec
    │ └───support

    here are all the TS files, app.ts is the start of the project has the listen functions
    └───src

        modules has the utilities, modules is more diverse of a name so I used it.
        here you'll find the images.ts file has the middleware and the resize function
        ├───modules

        here is the routing system that starts with index.ts. the in the api folder there is the getImage which has all the magic in it
        ├───routes
        │   └───api

        here are all jasmine based tests
        └───tests
            ├───helpers
            ├───modules
            └───routes
                └───api

    all the js files 
    ├───build
    │ ├───modules
    │ ├───routes
    │ │ └───api
    │ └───tests
    │ ├───helpers
    │ ├───modules
    │ └───routes
    │ └───api
