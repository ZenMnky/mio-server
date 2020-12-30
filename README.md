# Mio - Server
RESTful api for Mio-Client 

- [Server Live Link](https://mio-server.herokuapp.com/)
- [Web App Live Link](https://mio-client.vercel.app/)

## Endpoints
- /api/profiles
    - supports GET, POST
- /api/profiles/:id
    - supports GET, PATCH, DELETE
## Technologies
Express.js, PostgreSQL, Node.js

## Scripts

- Start the application `npm start`
- Start development server `npm dev`
- Run database migrations `npm run migrate`
- Run test database migrations `npm run migrate:test`
- Deploy to heroku & run migrations `npm run deploy`

## Use / Set-up
- clone repo
- install and audit dependencies, `npm i` & `npm audit fix`
- create psql databases 'mio' and 'mio-test', `createdb mio && createdb mio-test`
- create `.env` file
- configure `.env` : 
    ```
    PORT=[your_dev_port]
    DATABASE_URL='postgresql://postgres@localhost/mio'
    TEST_DATABASE_URL='postgresql://postgres@localhost/mio-test'
    ```
- run database migrations, `npm run migrate && npm run migrate:test`
- Create, test, and ship 😁
---

## Improvement Ideas
- add authentication