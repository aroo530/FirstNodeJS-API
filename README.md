<h1> welcome to project 1 image API </h1>
I'll not waste your time here

npm run:

<h2> don't forget npm install to get all dependencies </h2>
    <!-- run jasmine test on the latest build -->
    "test": "npm run build && npm run jasmine",
    <!-- run jasmine on existing build -->
    "jasmine": "jasmine",
    <!-- build to convert the typescript to javascript  -->
    "build": "npx tsc",
    <!-- run the typescript build -->
    "TSstart": "nodemon src/app.ts",
    <!-- run the javavScript build -->
    "JSstart": "npm run build && nodemon build/app.js"

I didn't use eslint nor prettier configs and scripts since my IDE has support for them

the project is over organized and full of directories but u required scallable project so this should do the trick

project structure:

    ├───.vscode

    so here are all the sourced images remember that if the dimensions change the api will creatte a new one  
    ├───images
    │ ├───full
    │ └───thumbs

    here is the jasmine config
    ├───spec
    │ └───support

    here are all the TS files app.ts is the start of the project has the listen functions
    └───src

        modules has the utilities modules is more diverse of a name so I used it
        here you'll fine the images.ts file has the middleware and the resize function
        ├───modules

        here is the routing system that starts with index.ts the in the api folder there is the getImage which has all the magic in it
        ├───routes
        │   └───api

        here are all jasmine based tests
        └───tests
            ├───helpers
            ├───modules
            └───routes
                └───api

    all the js files details are
    ├───build
    │ ├───modules
    │ ├───routes
    │ │ └───api
    │ └───tests
    │ ├───helpers
    │ ├───modules
    │ └───routes
    │ └───api
