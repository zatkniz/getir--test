
## About getir test

  

This project is build with node.js, express.js and Jest.js for testing purposes of getir company.

  

## Technologies - Libraries used

  

-  **[node.js](https://nodejs.org/en/)**

-  **[express.js](https://expressjs.com/)**

-  **[jest.js](https://jestjs.io/)**

-  **[moment.js](https://momentjs.com/)**

-  **[Docker](https://www.docker.com/)**

  
  

## Installation

  

```

$ git clone https://github.com/zatkniz/getir--test.git

$ cd getir--test

$ cp .env.example .env

```

  

If you will run the application without docker:

```

$ npm install

$ npm run start

```

  

[http://localhost:9000/](http://localhost:9000/)

  
  

If you will run with Docker:

```
$ docker build --tag getir-test .

$ docker run -d -p 80:9000 getir-test
```

[http://localhost/](http://localhost/)

  
  

This app also running on AWS S3 server at

[http://peqer.trycatch.gr:9000/](http://peqer.trycatch.gr:9000/)

  

## Test

  

```bash

# unit tests

$ npm run test

```

**The .env variables are provided in email**